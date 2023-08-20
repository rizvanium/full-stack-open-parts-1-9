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
  describe('GET /api/blogs', () => {
    test('returns blogs as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('returns all blogs', async () => {
      const response = await api.get('/api/blogs');
      expect(response.body).toHaveLength(helper.blogsTestData.length);
    });

    test('contains specific blog', async () => {
      const response = await api.get('/api/blogs');
      const titles = response.body.map((blog) => blog.title);
      expect(titles).toContain(helper.blogsTestData[0].title);
    });

    test('every blog contains id property', async () => {
      const response = await api.get('/api/blogs');
      response.body.forEach((blog) => expect(blog.id).toBeDefined());
    });
  });

  describe('POST /api/blogs', () => {
    test('creates a valid blog post', async () => {
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

    test('creates a valid blog post when a request is missing [likes] property', async () => {
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

    test('responds with 400 error when a request is missing a [title] property', async () => {
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

    test('responds with 400 error when a request is missing a [url] property', async () => {
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

  describe('DELETE /api/blogs/:id', () => {
    test('removes the selected blog post when given valid existing id', async () => {
      let blogs = await helper.blogsInDb();

      const validId = blogs[0].id;
      await api.delete(`/api/blogs/${validId}`).expect(204);

      blogs = await helper.blogsInDb();
      expect(blogs).toHaveLength(helper.blogsTestData.length - 1);
    });

    test('fails to remove a blog and returns 400 bad request error when given invalid id', async () => {
      const invalidId = '---invalid-fomat---';
      await api.delete(`/api/blogs/${invalidId}`).expect(400);

      const blogs = await helper.blogsInDb();
      expect(blogs).toHaveLength(helper.blogsTestData.length);
    });

    test('fails to remove a blog and returns 404 not found error when given non-existent id', async () => {
      const nonExistentId = await helper.getNonExistentId();

      await api.delete(`/api/blogs/${nonExistentId}`).expect(400);

      const blogs = await helper.blogsInDb();
      expect(blogs).toHaveLength(helper.blogsTestData.length);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
