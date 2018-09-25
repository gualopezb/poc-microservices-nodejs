const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const error = require('koa-json-error');
const koaValidate = require('koa-validate');

const formatError = require('../../../utils/formatError');

const db = require('../databse');
const repositories = require('../../repositories')(db);
const devicesRoutes = require('./routes/devices');

const { devicesRepository } = repositories;
const { startDevicesConsumers } = require('../../../utils/kafka/consumers/devices');

startDevicesConsumers(devicesRepository);

const startServer = () => {
  const app = new Koa();

  koaValidate(app);
  app.proxy = true;

  app.use(morgan.middleware('combined'));
  app.use(bodyParser());
  app.use(error({ format: formatError }));

  app.use(devicesRoutes(repositories));

  app.listen(6000, 'localhost', () => {
    console.log('Server listening on port 6000');
  });
};

module.exports = startServer;
