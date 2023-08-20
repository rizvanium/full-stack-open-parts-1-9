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

const getNonExistentId = async () => {
  const blogs = await Blog.find({});
  const id = blogs[0].id;
  const tempBlog = {
    title: blogs[0].title,
    author: blogs[0].author,
    url: blogs[0].url,
    likes: blogs[0].likes,
  };
  await Blog.findByIdAndDelete(id);
  await new Blog(tempBlog).save();
  return id;
};

module.exports = {
  blogsTestData,
  blogsInDb,
  getNonExistentId,
};
