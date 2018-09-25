const devicesControllerFactory = require('./devicesController');

module.exports = (repositories) => {
  const devicesController = devicesControllerFactory
    .createController(repositories.devicesRepository);

  return {
    devicesController
  };
};
