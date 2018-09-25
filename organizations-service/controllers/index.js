const { produce } = require('../utils/kafka');
const {
  createInvitation: {
    checkRequiredParams,
    checkNotificationExistence,
    checkOrganizationOwnership,
    checkInvitedWithinOrganization
  },
  acceptInvitation: {
    checkUserInvitedOnAccept,
    checkRequiredParamsAcceptInvitation
  }
} = require('../middlewares');
const { acceptInvitation } = require('../repositories');

module.exports = {
  createInvitation: [
    function* (next) {
      yield next;
      const { params: { id }, request: { body: { userInvited } } } = this;

      produce({
        topic: 'users',
        messages: [{
          type: 'SEND_INVITATION',
          organizationId: id,
          userInvited,
        }],
      }).then(data => console.log('Produced message: ', data));

      this.body = {
        message: 'Invitation is being created',
      };
    },
    checkRequiredParams,
    checkNotificationExistence,
    checkOrganizationOwnership,
    checkInvitedWithinOrganization
  ],

  acceptInvitation: [
    function* (next) {
      yield next;
      const { params: { id }, request: { body: { username } } } = this;
      yield acceptInvitation(id);
      const { invitation: { organization, userInvited } } = this.state;

      produce({
        topic: 'users',
        messages: [{
          type: 'INVITATION_ACCEPTED',
          organizationId: organization,
          userInvited,
          username
        }],
      }).then(data => console.log('Produced message: ', data));

      this.body = {
        message: 'The invitation has been accepted'
      };
    },
    checkRequiredParamsAcceptInvitation,
    checkUserInvitedOnAccept
  ]
};
