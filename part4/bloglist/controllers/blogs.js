const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) {
      response.status(401).json({
        error: 'JWT invalid',
      });
    }

    const body = request.body;

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      ...body,
      author: user.name ?? 'unknown',
      likes: body.likes ?? 0,
      user: user.id,
    });

    const newBlog = await blog.save();

    user.blogs = user.blogs.concat(newBlog.id);
    await user.save();

    response.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      {
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url,
      },
      {
        new: true,
        runValidators: true,
        context: 'query',
      }
    );
    if (!updatedBlog) {
      response.status(404).end();
    }
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
