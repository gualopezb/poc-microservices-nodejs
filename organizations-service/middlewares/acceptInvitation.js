const { findInvitationById } = require('../repositories');

function* checkRequiredParamsAcceptInvitation(next) {
  this.checkBody('userInvited').notEmpty();
  this.checkBody('username').notEmpty();

  if (this.errors) {
    const e = new Error();
    e.status = 400;
    e.message = this.errors;
    throw e;
  }

  yield next;
}

function* checkUserInvitedOnAccept(next) {
  const { params: { id }, request: { body: { userInvited } } } = this;
  const invitation = yield findInvitationById(id);
  const { userInvited: userInvitedDB } = invitation;

  this.state.invitation = invitation;

  if (userInvited !== userInvitedDB.toString()) {
    const e = new Error();
    e.status = 401;
    e.message = 'Unauthorized';
    throw e;
  }

  yield next;
}

module.exports = {
  checkUserInvitedOnAccept,
  checkRequiredParamsAcceptInvitation
};
