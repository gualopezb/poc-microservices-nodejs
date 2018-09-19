const { findUserByUsername } = require('./repository');

const checkSignupParams = async (ctx, next) => {
  ctx.checkBody('username').notEmpty();
  ctx.checkBody('password').notEmpty().len(3, 20);

  if (ctx.errors) {
    const e = new Error();
    e.status = 400;
    e.message = ctx.errors;
    throw e;
  }

  await next();
};

const checkUsernameExistence = async (ctx) => {
  const { request: { body: { username } } } = ctx;
  const user = await findUserByUsername(username);

  if (user) {
    const e = new Error();
    e.status = 422;
    e.message = `A user with the username ${username} already exists.`;
    throw e;
  }
};

module.exports = {
  checkSignupParams,
  checkUsernameExistence,
};
