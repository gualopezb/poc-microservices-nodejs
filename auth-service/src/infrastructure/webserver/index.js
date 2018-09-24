const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const error = require('koa-json-error');
const koaValidate = require('koa-validate');

const formatError = require('../../../utils/formatError');

const db = require('../../../src/infrastructure/database');
const repositories = require('../../../src/repositories')(db);
const userRoutes = require('./routes/users');

const startServer = () => {
  const app = new Koa();

  koaValidate(app);
  app.proxy = true;

  app.use(morgan.middleware('combined'));
  app.use(bodyParser());
  app.use(error({ format: formatError }));

  app.use(userRoutes(repositories));

  app.listen(4000, 'localhost', () => {
    console.log('Server listening on port 4000');
  });
};

module.exports = startServer;
