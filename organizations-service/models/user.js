const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  username: String,
  admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
