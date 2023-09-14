const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

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

blogsRouter.post(
  '/',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const body = request.body;

      const blog = new Blog({
        ...body,
        author: body.author ?? 'unknown',
        likes: body.likes ?? 0,
        user: request.user.id,
      });

      const newBlog = await blog.save();
      request.user.blogs = request.user.blogs.concat(newBlog.id);
      await request.user.save();

      const populatedBlog = await newBlog.populate('user', {
        username: 1,
        name: 1,
        id: 1,
      });

      response.status(201).json(populatedBlog);
    } catch (error) {
      next(error);
    }
  }
);

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    try {
      const blog = await Blog.findById(request.params.id);
      if (!blog) {
        response.status(204).end();
      }
      if (blog.user.toString() !== request.user.id) {
        return response.status(401).json({
          error: 'unauthorized blog operation',
        });
      }
      await Blog.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

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
      return response.status(404).json({
        error: `blog with id:${request.params.id} could not be found`,
      });
    }

    const populatedBlog = await updatedBlog.populate('user', {
      username: 1,
      name: 1,
      id: 1,
    });

    response.json(populatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
