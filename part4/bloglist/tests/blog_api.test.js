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

  test('POST /api/blogs creates a valid blog post', async () => {
    const newBlog = {
      title: 'Valid blog post',
      author: 'Test Dummy',
      url: 'http://www.somerandomblogurl.com',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.blogsTestData.length + 1);
    expect(
      blogs.map((blog) => ({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
      }))
    ).toContainEqual(newBlog);
  });

  test('POST /api/blogs creates a valid blog post when likes property is missing from the request', async () => {
    const newBlog = {
      title: 'Blog missing likes property',
      author: 'Test Dummy',
      url: 'http://www.somerandomblogurl.com',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.blogsTestData.length + 1);

    const addedBlog = blogs.find((blog) => newBlog.title === blog.title);
    expect(addedBlog.likes).toBe(0);
  });

  test('POST /api/blogs responds with 400 error when request is missing a [title] property', async () => {
    const newBlog = {
      author: 'Test Dummy',
      url: 'http://www.somerandomblogurl.com',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.blogsTestData.length);
  });

  test('POST /api/blogs responds with 400 error when request is missing a [url] property', async () => {
    const newBlog = {
      title: 'Blog missing likes property',
      author: 'Test Dummy',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.blogsTestData.length);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
