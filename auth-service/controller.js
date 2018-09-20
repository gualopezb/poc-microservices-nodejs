const passport = require('koa-passport');
const jsonwebtoken = require('jsonwebtoken');

require('./utils/passport/localStrategy');
require('./utils/passport/jwtStrategy');

const { createUser } = require('./repository');
const { checkSignupParams, checkUsernameExistence } = require('./middlewares');
const { ENV: { JWT_SECRET } } = require('./utils/config');

module.exports = {
  createUser: [
    function* create(next) {
      yield next;

      const { request: { body: { username, password } } } = this;
      yield createUser({
        username,
        rawPassword: password,
      });

      this.body = {
        message: 'User registered successfully',
      };
    },
    checkSignupParams,
    checkUsernameExistence
  ],

  login: [
    function* (next) {
      yield next;

      const { state: { user: { id } } } = this;
      const jwt = jsonwebtoken.sign({ id }, JWT_SECRET);

      this.body = {
        jwt,
      };
    },
    function* () {
      const ctx = this;
      yield passport.authenticate('local', function* (err, user) {
        if (err) {
          ctx.throw(500);
        }

        if (!user) {
          ctx.throw(401);
        }

        ctx.state.user = user;
      }).call(this);
    }
  ],

  auth: [
    function* (next) {
      yield next;

      const { state: { user: { id, username } } } = this;

      this.body = {
        id,
        username,
      };
    },
    function* () {
      const ctx = this;
      yield passport.authenticate('jwt', function* (err, user) {
        if (err) {
          ctx.throw(500);
        }

        if (!user) {
          ctx.throw(401);
        }

        ctx.state.user = user;
      }).call(this);
    }
  ]
};
