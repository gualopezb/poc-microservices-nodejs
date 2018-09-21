const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const morgan = require('koa-morgan');
const error = require('koa-json-error');
const koaValidate = require('koa-validate');

require('./utils/kafka/consumers/users');

const { createInvitation, acceptInvitation } = require('./controllers');
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

router.post('/api/organizations/:id/invitations', ...createInvitation);
router.patch('/api/invitations/:id', ...acceptInvitation);

app.use(router.routes());

app.listen(5000, 'localhost', () => {
  console.log('Server listening on port 5000');
});
