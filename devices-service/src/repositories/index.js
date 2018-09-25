const deviceRepositoryFactory = require('./deviceRepository');

module.exports = (db) => {
  const devicesRepository = deviceRepositoryFactory.create(db);

  return {
    devicesRepository
  };
};
