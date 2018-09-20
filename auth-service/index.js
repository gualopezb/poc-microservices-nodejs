const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const error = require('koa-json-error');
const koaValidate = require('koa-validate');

const { createUser, login, auth } = require('./controller');
const getDBConnection = require('./config/db');
const formatError = require('./utils/formatError');

getDBConnection();

const app = new Koa();
const router = new Router();

koaValidate(app);
app.proxy = true;

app.use(morgan.middleware('combined'));

app.use(bodyParser());
app.use(error({ format: formatError }));

router.post('/api/users', ...createUser);
router.post('/api/users/login', ...login);
router.get('/api/users/auth', ...auth);

app.use(router.routes());

app.listen(4000, 'localhost', () => {
  console.log('Server listening on port 4000');
});
