const Blog = require('../models/blog');

const blogsTestData = [
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
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const getSpecificBlogInDb = async (id) => {
  const blog = await Blog.findById(id);
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

module.exports = {
  blogsTestData,
  getSpecificBlogInDb,
  blogsInDb,
  getExistingId,
  getNonExistentId,
};
