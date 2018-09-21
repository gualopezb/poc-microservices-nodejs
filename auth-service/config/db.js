const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const {
  DB: {
    HOST, PORT, NAME, USER, PASSWORD,
  }
} = require('../utils/config');

const getConnection = () => mongoose
  .connect(
    `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`,
    { useNewUrlParser: true },
    (err, conn) => {
      if (err) {
        throw new Error(`Error connecting mongodb: ${err}`);
      }

      console.error(`Connected to ${NAME} database`);
      return conn;
    }
  );

module.exports = getConnection;
