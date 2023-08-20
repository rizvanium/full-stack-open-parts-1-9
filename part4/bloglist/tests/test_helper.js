const Blog = require('../models/blog');

const blogsTestData = [
  {
    title: 'Test Blog 1',
    author: 'Test Dummy 1',
    url: 'http://www.somerandomblogurl1.com',
    likes: 5,
  },
  {
    title: 'Test Blog 2',
    author: 'Test Dummy 2',
    url: 'http://www.somerandomblogurl2.com',
    likes: 10,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  blogsTestData,
  blogsInDb,
};
