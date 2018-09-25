const usersControllerFactory = require('./usersController');

module.exports = (repositories) => {
  const usersController = usersControllerFactory.createController(repositories.usersRepository);

  return {
    usersController
  };
};
