const User = require('./entities/user');

const getDBConnection = require('../../../config/db');

getDBConnection();

module.exports = {
  User
};
