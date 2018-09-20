const passport = require('koa-passport');
const { ExtractJwt: { fromAuthHeaderAsBearerToken }, Strategy } = require('passport-jwt');

const { findUserById } = require('../../repository');
const { ENV: { JWT_SECRET } } = require('../config');

const jwtOptions = {
  jwtFromRequest: fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

const jwtLogin = new Strategy(
  jwtOptions,
  (payload, done) => {
    findUserById(payload.id)
      .then((user) => {
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      })
      .catch(err => done(err, false));
  }
);

passport.use(jwtLogin);
