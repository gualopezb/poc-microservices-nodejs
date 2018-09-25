const userRepositoryFactory = require('./userRepository');

module.exports = (db) => {
  const usersRepository = userRepositoryFactory.create(db);

  return {
    usersRepository
  };
};
