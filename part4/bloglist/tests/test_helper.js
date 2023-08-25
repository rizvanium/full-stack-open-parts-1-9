const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const Blog = require('../models/blog');
const User = require('../models/user');

const blogList = [
  {
    title: 'Test Blog 1',
    url: 'http://www.somerandomblogurl1.com',
    likes: 5,
  },
  {
    title: 'Test Blog 2',
    url: 'http://www.somerandomblogurl2.com',
    likes: 10,
  },
  {
    title: 'Test Blog 3',
    url: 'http://www.somerandomblogurl3.com',
    likes: 1,
  },
  {
    title: 'Test Blog 4',
    url: 'http://www.somerandomblogurl2.com',
    likes: 4,
  },
];

const userList = [
  {
    username: 'testDummy1',
    name: 'Test Dummy 1',
    password: 'test123456',
  },
  {
    username: 'testDummy2',
    name: 'Test Dummy 2',
    password: 'test123456',
  },
];

const data = {
  blogs: blogList,
  users: userList,
};

const resetDb = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const passwordHashes = await Promise.all(
    data.users.map((user) =>
      bcrypt.hash(user.password, config.HASH_SALT_ROUNDS)
    )
  );

  const users = data.users.map((user, idx) => {
    return new User({
      username: user.username,
      name: user.name,
      passwordHash: passwordHashes[idx],
    });
  });

  await Promise.all(users.map((user) => user.save()));

  const blogs = data.blogs.map((blog, idx) => {
    const user = idx === 0 ? users[idx] : users.at(-1);
    return new Blog({ ...blog, user: user.id });
  });

  await Promise.all(blogs.map((blog) => blog.save()));

  const userPromises = users.map((user) => {
    const blogIds = blogs
      .filter((blog) => blog.user.toString() === user.id)
      .map((blog) => blog._id);
    user.blogs = user.blogs.concat(...blogIds);
    return user.save();
  });

  await Promise.all(userPromises);
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getBlogFromDb = async (id) => {
  const blog = await Blog.findById(id);
  return blog;
};

const getUserFromDb = async (username) => {
  const blog = await User.findOne({ username });
  return blog;
};

const getExistingId = async () => {
  const blogs = await blogsInDb();
  return blogs[0].id;
};

const getNonExistentId = async () => {
  const blog = new Blog({ title: 'forid', url: 'whocares' });
  await blog.save();
  await Blog.findByIdAndDelete(blog._id.toString());
  return blog._id.toString();
};

const getUserAuthData = async (username) => {
  const user = await getUserFromDb(username);
  const userInfo = {
    id: user._id.toString(),
    username: user.username,
  };
  const token = jwt.sign(userInfo, config.SECRET, { expiresIn: 3600 });

  return { user: user, token };
};

module.exports = {
  data,
  resetDb,
  getBlogFromDb,
  getUserFromDb,
  blogsInDb,
  usersInDb,
  getExistingId,
  getNonExistentId,
  getUserAuthData,
};
