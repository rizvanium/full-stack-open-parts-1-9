const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const User = require('../models/user');
const loginRouter = require('express').Router();

loginRouter.post('/', async (request, response, next) => {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });

    const passwordIsCorrect = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!user || !passwordIsCorrect) {
      return response.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userInfo = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userInfo, config.SECRET);

    response.json({
      token,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
