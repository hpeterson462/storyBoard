const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signup = async ({ email, password }) => {
  const passwordHash = await bcrypt.hash(password, 14);
  return User.insert({ email, passwordHash });
};

const authorize = async ({ email, password }) => {
  const user = await User.findByEmail(email);
  if (!user) throw new Error('Invalid email or password');

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) throw new Error('Invalid email or password');

  return user;
};

const makeToken = user => {
  const token = jwt.sign(user.toJSON(), process.env.APP_SECRET, {
    expiresIn: '1d'
  });
  return token;
};

const verifyToken = token => {
  const { payload } = jwt.verify(token, process.env.APP_SECRET);
  return payload;
};

module.exports = {
  signup,
  authorize,
  makeToken,
  verifyToken
};
