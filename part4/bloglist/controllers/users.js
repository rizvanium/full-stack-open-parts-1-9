const bcrypt = require('bcryptjs');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs');
    response.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({ username, name, passwordHash });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
