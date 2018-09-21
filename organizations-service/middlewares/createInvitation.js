const { findOrganizationById } = require('../repositories');

function* checkRequiredParams(next) {
  this.checkBody('userAdmin').notEmpty();
  this.checkBody('userInvited').notEmpty();

  if (this.errors) {
    const e = new Error();
    e.status = 400;
    e.message = this.errors;
    throw e;
  }

  yield next;
}

function* checkNotificationExistence(next) {
  const { params: { id } } = this;
  const organization = yield findOrganizationById(id);

  if (!organization) {
    const e = new Error();
    e.status = 404;
    e.message = `Organization with id ${id} not found.`;
    throw e;
  }

  this.state.organization = organization;
  yield next;
}

function* checkOrganizationOwnership(next) {
  const {
    params: { id },
    request: { body: { userAdmin } },
    state: { organization }
  } = this;

  if (!organization) {
    const e = new Error();
    e.status = 404;
    e.message = `Organization with id ${id} not found.`;
    throw e;
  }

  const { userId } = organization.users.find(({ admin }) => admin);
  if (userId.toString() !== userAdmin) {
    const e = new Error();
    e.status = 401;
    e.message = 'Unauthorized';
    throw e;
  }

  yield next;
}

function* checkInvitedWithinOrganization(next) {
  const {
    request: { body: { userInvited } },
    state: { organization }
  } = this;
  const organizationUsersIds = organization.users.map(({ userId }) => userId.toString());

  if (organizationUsersIds.includes(userInvited)) {
    const e = new Error();
    e.status = 401;
    e.message = `The user with ID ${userInvited} is already a member of the organization.`;
    throw e;
  }

  yield next;
}

module.exports = {
  checkRequiredParams,
  checkNotificationExistence,
  checkOrganizationOwnership,
  checkInvitedWithinOrganization
};
