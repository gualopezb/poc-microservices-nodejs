const bcrypt = require('bcryptjs');

const User = require('../models/user');

const findUserByUsername = username => User.findOne({ username });

const findUserById = id => User.findById(id);

const createUser = ({ username, rawPassword }) => bcrypt.hash(rawPassword, 8)
  .then((password) => {
    const user = new User({
      username,
      password,
    });

    return user.save();
  })
  .catch((err) => {
    throw new Error(err);
  });

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
