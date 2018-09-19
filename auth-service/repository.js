const bcrypt = require('bcryptjs');

const User = require('./model');

const findUserByUsername = username => User.findOne({ username });

const findUserById = id => User.findById(id);

const createUser = async ({ username, rawPassword }) => {
  const password = await bcrypt.hash(rawPassword, 8);

  const user = new User({
    username,
    password,
  });

  try {
    await user.save();
    return user;
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
