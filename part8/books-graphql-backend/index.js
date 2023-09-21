require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { GraphQLError } = require('graphql');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

mongoose.set('strictQuery', false);

console.log('connecting to DB');

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('successfully connected to DB');
  })
  .catch((error) => {
    console.log('error connecting to DB, reason', error.message);
    process.exit(1);
  });

const typeDefs = `
  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`;

const resolvers = {
  Author: {
    bookCount: (root) => {
      return root.books ? root.books.length : 0;
    },
  },
  Book: {
    author: async (root) => {
      const populatedRoot = await root.populate('author');
      return populatedRoot.author;
    },
  },

  Query: {
    bookCount: async () => await Book.countDocuments({}),
    authorCount: async () => await Author.countDocuments({}),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      }

      if (!args.author && args.genre) {
        return Book.find({ genres: args.genre });
      }

      const author = await Author.findOne({ name: args.author });
      if (args.author && !args.genre) {
        return Book.find({ author: author?.id });
      }

      return Book.find({ author: author?.id, genres: args.genre });
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('unauthorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      try {
        if (!author) {
          author = new Author({ name: args.author, books: [] });
          await author.save();
        }
      } catch (error) {
        throw new GraphQLError('Adding new author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error,
          },
        });
      }

      const book = new Book({ ...args, author: author.id });
      try {
        await book.save();
        author.books = author.books.concat(book.id);
        await author.save();
      } catch (error) {
        throw new GraphQLError('Saving new book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      return book;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('unauthorized', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      try {
        const updatedAuthor = await Author.findOneAndUpdate(
          { name: args.name },
          {
            born: args.setBornTo,
          },
          { new: true, runValidators: true, context: 'query' }
        );
        return updatedAuthor;
      } catch (error) {
        throw new GraphQLError('Updating author info failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
    },

    createUser: async (root, args) => {
      const { HASH_SALT_ROUNDS, UNIVERSAL_PASSWORD } = process.env;

      const passwordHash = await bcrypt.hash(
        UNIVERSAL_PASSWORD,
        +HASH_SALT_ROUNDS
      );
      const user = new User({ ...args, passwordHash });
      try {
        return user.save();
      } catch (error) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.username,
            error,
          },
        });
      }
    },

    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      const passwordIsCorrect = user
        ? await bcrypt.compare(password, user.passwordHash)
        : false;

      if (!user || !passwordIsCorrect) {
        throw new GraphQLError('invalid username or password', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userInfo = {
        id: user.id,
        username: user.username,
      };

      return {
        value: jwt.sign(userInfo, process.env.SECRET, { expiresIn: 3600 }),
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith('Bearer ')) {
      try {
        const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (error) {
        return { currentUser: null };
      }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
