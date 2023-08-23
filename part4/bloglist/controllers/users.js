const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');
const config = require('../utils/config');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!password) {
    response.status(400).json({ error: 'password must be provided' });
  }

  if (password.length < 3) {
    response
      .status(400)
      .json({ error: 'password must at be at least 3 characters' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, config.HASH_SALT_ROUNDS);
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
