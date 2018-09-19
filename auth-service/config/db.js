const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  DB: {
    HOST, PORT, NAME, USER, PASSWORD,
  },
} = require('../utils/config');

const getConnection = async () => {
  try {
    console.log(`Connecting to ${NAME}`);
    const conn = await mongoose.connect(
      `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`,
      { useNewUrlParser: true },
    );
    return conn;
  } catch (e) {
    throw new Error(`Error connecting mongodb: ${e}`);
  }
};

module.exports = getConnection;
