const bcrypt = require('bcryptjs');

function create({ User }) {
  const findUserByUsername = username => User
    .findOne({ username })
    .then(user => user && User.schema.statics.toUserModel(user));

  const findUserById = id => User
    .findById(id)
    .then(user => user && User.schema.statics.toUserModel(user));

  const createUser = ({ username, rawPassword }) => bcrypt.hash(rawPassword, 8)
    .then((password) => {
      const user = new User({
        username,
        password,
      });

      return user
        .save();
    })
    .catch((err) => {
      throw new Error(err);
    });

  return {
    findUserByUsername,
    findUserById,
    createUser
  };
}

module.exports.create = create;
