const mongoose = require('mongoose');

const UserModel = require('../../../models/user');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String
});

UserSchema.statics.toUserModel = (user) => {
  const { id, username, password } = user;
  return new UserModel({ id, username, password });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
