const { consume, produce } = require('../');
const {
  findOrganizationById
} = require('../../../repositories');

consume({
  topic: 'devices',
  callback(payload) {
    const { type } = payload;
    switch (type) {
      case 'CREATE_DEVICE_REQUEST': {
        console.info('Consume CREATE_DEVICE_REQUEST message');
        const {
          name, mac, userId, organizationId
        } = payload;

        findOrganizationById(organizationId).then((organization) => {
          if (!organization) {
            console.log(`Organization with ID ${organizationId} does not exist.`);
            return;
          }

          const users = organization.users.map(({ userId: userID }) => userID.toString());

          if (!users.includes(userId)) {
            console.log(`User ${userId} is not a member of the organization ${organizationId}`);
            return;
          }

          produce({
            topic: 'devices2',
            messages: [{
              type: 'CREATE_DEVICE_REQUEST_VALID', name, mac, userId, organizationId
            }]
          }).then(data => console.log('Produced message: ', data));
        });

        break;
      }

      default:
        break;
    }
  }
});
