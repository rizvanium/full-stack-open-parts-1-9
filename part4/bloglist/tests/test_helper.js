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
  const blog = new Blog({ title: 'forid', url: 'whocares' });
  await blog.save();
  await Blog.findByIdAndDelete(blog._id.toString());

  const blogs = await blogsInDb();
  console.log('id:', blog._id.toString(), blogs);
  return blog._id.toString();
};

module.exports = {
  blogsTestData,
  blogsInDb,
  getNonExistentId,
};
