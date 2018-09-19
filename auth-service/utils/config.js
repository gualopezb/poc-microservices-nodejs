const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });
module.exports = {
  DB: {
    NAME: process.env.DB_DATABASE,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.PORT,
  },
  ENV: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};
