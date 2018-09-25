const Router = require('koa-router');

const router = new Router();

const createController = require('../../../../src/controllers');

const userRoutes = (repositories) => {
  const { usersController } = createController(repositories);

  router.post('/api/users', ...usersController.createUser);
  router.post('/api/users/login', ...usersController.login);
  router.get('/api/users/auth', ...usersController.auth);

  return router.routes();
};

module.exports = userRoutes;
