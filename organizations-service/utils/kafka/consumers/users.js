const { consume } = require('../');
const {
  createOrganization,
  createInvitation,
  addMemberOnOrganization
} = require('../../../repositories');

consume({
  topic: 'users',
  callback(payload) {
    const { type } = payload;
    switch (type) {
      case 'USER_CREATED': {
        console.info('Consume USER_CREATED message');
        const { id, username } = payload;
        createOrganization({
          userId: id,
          username
        });
        break;
      }

      case 'SEND_INVITATION': {
        console.info('Consume SEND_INVITATION message');
        const { organizationId, userInvited } = payload;
        createInvitation({
          organization: organizationId,
          userInvited
        });
        break;
      }

      case 'INVITATION_ACCEPTED': {
        console.info('Consume INVITATION_ACCEPTED message');
        const { organizationId, userInvited, username } = payload;
        addMemberOnOrganization({
          organizationId,
          userInvited,
          username
        });
        break;
      }

      default:
        break;
    }
  }
});
