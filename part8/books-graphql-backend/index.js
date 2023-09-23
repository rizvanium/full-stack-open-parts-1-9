require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const User = require('./models/user');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

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
