const mongoose = require('mongoose');

const { Schema } = mongoose;
const User = require('./user');

const OrganizationSchema = new Schema({
  name: String,
  users: [User.schema]
});

module.exports = mongoose.model('Organization', OrganizationSchema);
