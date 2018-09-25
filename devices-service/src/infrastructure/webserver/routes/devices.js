const Router = require('koa-router');

const router = new Router();

const createController = require('../../../controllers');

const devicesRoutes = (repositories) => {
  const { devicesController } = createController(repositories);

  router.post('/api/devices', ...devicesController.createDevice);
  router.patch('/api/devices/:id', ...devicesController.updateDevice);

  return router.routes();
};

module.exports = devicesRoutes;
