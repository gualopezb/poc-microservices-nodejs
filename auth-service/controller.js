const passport = require('koa-passport');
const jsonwebtoken = require('jsonwebtoken');

require('./utils/passport/localStrategy');
require('./utils/passport/jwtStrategy');

const { createUser } = require('./repository');
const { checkSignupParams, checkUsernameExistence } = require('./middlewares');
const { ENV: { JWT_SECRET } } = require('./utils/config');

module.exports = {
  createUser: [
    async (ctx, next) => {
      await next();

      const { request: { body: { username, password } } } = ctx;
      await createUser({
        username,
        rawPassword: password,
      });

      ctx.body = {
        message: 'User registered successfully',
      };
    },
    checkSignupParams,
    checkUsernameExistence],

  login: [
    async (ctx, next) => {
      await next();

      const { state: { user: { id } } } = ctx;
      const jwt = jsonwebtoken.sign({ id }, JWT_SECRET);

      ctx.body = {
        jwt,
      };
    },
    async ctx => passport.authenticate('local', (err, user) => {
      if (!user) {
        ctx.throw(401);
      }

      ctx.state.user = user;
    })(ctx),
  ],

  auth: [
    async (ctx, next) => {
      await next();

      const { state: { user: { id, username } } } = ctx;

      ctx.body = {
        id,
        username,
      };
    },
    async ctx => passport.authenticate('jwt', (err, user) => {
      if (!user) {
        ctx.throw(401);
      }

      ctx.state.user = user;
    })(ctx),
  ],
};
