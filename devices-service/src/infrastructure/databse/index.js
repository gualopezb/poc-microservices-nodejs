const Device = require('./entities/device');

const getDBConnection = require('../../../config/db');

getDBConnection();

module.exports = {
  Device
};
