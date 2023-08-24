const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const config = require('../utils/config');

const api = supertest(app);

beforeEach(async () => {
  await helper.resetDb();
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
    test('removes the selected blog post returns code: [204 no content] when given valid existing id', async () => {
      const validId = await helper.getExistingId();
      await api.delete(`/api/blogs/${validId}`).expect(204);

      const blogs = await helper.blogsInDb();
      expect(blogs).toHaveLength(helper.blogsTestData.length - 1);
    });

    test('fails to remove a blog and returns code: [400 bad request] when given invalid id', async () => {
      const invalidId = '---invalid-fomat---';
      await api.delete(`/api/blogs/${invalidId}`).expect(400);

      const blogs = await helper.blogsInDb();
      expect(blogs).toHaveLength(helper.blogsTestData.length);
    });

    test('fails to remove a blog and returns code: [204 no content] when given non-existent id', async () => {
      const nonExistentId = await helper.getNonExistentId();

      await api.delete(`/api/blogs/${nonExistentId}`).expect(204);

      const blogs = await helper.blogsInDb();
      expect(blogs).toHaveLength(helper.blogsTestData.length);
    });
  });

  describe('PUT /api/blogs/:id', () => {
    test('successfully updates existing blog and ignores additional properties', async () => {
      let id = await helper.getExistingId();
      const blogBefore = await helper.getSpecificBlogInDb(id);

      let blogUpdates = {
        title: 'update',
        additional: 'should-not-contain-this',
      };

      await api
        .put(`/api/blogs/${id}`)
        .send(blogUpdates)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const blogAfter = await helper.getSpecificBlogInDb(id);

      expect(blogAfter.title).toBe(blogUpdates.title);

      expect(blogAfter.author).toBe(blogBefore.author);
      expect(blogAfter.url).toBe(blogBefore.url);
      expect(blogAfter.likes).toBe(blogBefore.likes);

      expect(blogAfter.additional).toBeUndefined();
    });

    test('fails to update on validation fail', async () => {
      let id = await helper.getExistingId();
      const blogBefore = await helper.getSpecificBlogInDb(id);

      let blogUpdates = {
        title: '',
      };

      await api.put(`/api/blogs/${id}`).send(blogUpdates).expect(400);

      const blogAfter = await helper.getSpecificBlogInDb(id);

      expect(blogAfter).toStrictEqual(blogBefore);
    });

    test('fails to update non-existent blog', async () => {
      const blogsBefore = await helper.blogsInDb();

      let id = await helper.getNonExistentId();
      let blogUpdates = {
        title: 'update',
        additional: 'should-not-contain-this',
      };

      await api.put(`/api/blogs/${id}`).send(blogUpdates).expect(404);

      const blogsAfter = await helper.blogsInDb();

      blogsAfter.forEach((blog, idx) => {
        expect(blog).toStrictEqual(blogsBefore[idx]);
      });
    });
  });

  describe('GET /api/users', () => {
    test('returns users as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('returns all users', async () => {
      const response = await api.get('/api/users');
      expect(response.body).toHaveLength(helper.blogsTestData.length);
    });
  });

  describe('POST /api/users', () => {
    describe('creates new user', () => {
      test('when given a valid request', async () => {
        const userRequest = {
          username: 'uniqueName',
          name: 'Unique Test Dummy',
          password: 'veryStrongPassword123',
        };

        await api
          .post('/api/users')
          .send(userRequest)
          .expect(201)
          .expect('Content-Type', /application\/json/);

        const users = await helper.usersInDb();
        expect(users).toHaveLength(helper.data.users.length + 1);
        expect(users.map((user) => user.username)).toContain(
          userRequest.username
        );
      });
    });

    describe('fails to create new user', () => {
      const checkFailureToAddUser = async (request, code) => {
        await api
          .post('/api/users')
          .send(request)
          .expect(code)
          .expect('Content-Type', /application\/json/);

        const users = await helper.usersInDb();
        expect(users).toHaveLength(helper.data.users.length);
      };

      test('when request is missing a username', async () => {
        const userRequest = {
          name: 'Unique Test Dummy',
          password: 'veryStrongPassword123',
        };

        await checkFailureToAddUser(userRequest, 400);
      });

      test('when request is missing a password', async () => {
        const userRequest = {
          username: 'uniqueName',
          name: 'Unique Test Dummy',
        };

        await checkFailureToAddUser(userRequest, 400);
      });

      test('when username is baddly formatted', async () => {
        const userRequest = {
          username: 'un',
          name: 'Unique Test Dummy',
          password: 'veryStrongPassword123',
        };

        await checkFailureToAddUser(userRequest, 400);
      });

      test('when password is baddly formatted', async () => {
        const userRequest = {
          username: 'uniqueName',
          name: 'Unique Test Dummy',
          password: 've',
        };

        await checkFailureToAddUser(userRequest, 400);
      });

      test('when given non unique username', async () => {
        const userRequest = {
          username: helper.data.users[0].username,
          name: 'Unique Test Dummy',
          password: 'veryStrongPassword123',
        };

        await checkFailureToAddUser(userRequest, 400);
      });
    });
  });

  describe('POST /api/login', () => {
    describe('returns a [valid JWT]', () => {
      test('when given valid existing username and password', async () => {
        const loginRequest = {
          username: helper.data.users[0].username,
          password: helper.data.users[0].password,
        };
        const { body } = await api
          .post('/api/login')
          .send(loginRequest)
          .expect(200)
          .expect('Content-Type', /application\/json/);

        const { token, username, name } = body;

        expect(username).toBe(helper.data.users[0].username);
        expect(name).toBe(helper.data.users[0].name);
        expect(token).toBeDefined();

        const user = await helper.getSpecificUserInDb(username);
        const userInfo = {
          id: user._id.toString(),
          username: user.username,
        };

        const testToken = jwt.sign(userInfo, config.SECRET, {
          expiresIn: 3600,
        });

        expect(token).toBe(testToken);
      });
    });

    describe('returns [401 unauthorized]', () => {
      const checkFailsToLogin = async (request, status) => {
        await api
          .post('/api/login')
          .send(request)
          .expect(status)
          .expect('Content-Type', /application\/json/);
      };

      test('when given non-existent username', async () => {
        const loginRequest = {
          username: 'nonExistent',
          password: 'whoCares',
        };
        await checkFailsToLogin(loginRequest, 401);
      });

      test('when given wrong password', async () => {
        const loginRequest = {
          username: helper.data.users[0].username,
          password: 'wrongPassword123',
        };
        await checkFailsToLogin(loginRequest, 401);
      });

      test('when given empty request body', async () => {
        await checkFailsToLogin({}, 401);
      });
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
