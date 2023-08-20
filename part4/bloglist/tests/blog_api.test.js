const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.blogsTestData);
});

describe('blogs api', () => {
  test('GET /api/blogs returns blogs as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('GET /api/blogs returns all blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.blogsTestData.length);
  });

  test('GET /api/blogs contains specific blog', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map((blog) => blog.title);
    expect(titles).toContain(helper.blogsTestData[0].title);
  });

  test('GET /api/blogs every blog contains id property', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
