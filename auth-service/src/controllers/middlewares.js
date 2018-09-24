function* checkSignupParams(next) {
  this.checkBody('username').notEmpty();
  this.checkBody('password').notEmpty().len(3, 20);

  if (this.errors) {
    const e = new Error();
    e.status = 400;
    e.message = this.errors;
    throw e;
  }

  yield next;
}

function checkUsernameExistence(findUserByUsername) {
  return function* () {
    const { request: { body: { username } } } = this;
    const user = yield findUserByUsername(username);

    if (user) {
      const e = new Error();
      e.status = 422;
      e.message = `A user with the username ${username} already exists.`;
      throw e;
    }
  };
}

module.exports = {
  checkSignupParams,
  checkUsernameExistence,
};
