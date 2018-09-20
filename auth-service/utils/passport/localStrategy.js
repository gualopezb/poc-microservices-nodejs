const passport = require('koa-passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');

const { findUserByUsername } = require('../../repository');

function validatePassword({ user, password }) {
  return bcrypt.compare(password, user.password);
}

function rejectLogin() {
  const error = { message: 'Incorrect credentials.' };
  return Promise.reject(error);
}

const localLogin = new Strategy(
  (username, password, done) => {
    findUserByUsername(username)
      .then((user) => {
        if (!user) {
          return rejectLogin();
        }

        return Promise.all([
          user,
          validatePassword({ user, password }),
        ]);
      })
      .then(([user, match]) => {
        if (!match) {
          return rejectLogin();
        }
        done(null, user);
        return Promise.resolve();
      })
      .catch((err) => {
        done(null, false, err);
      });
  }
);

passport.use(localLogin);
