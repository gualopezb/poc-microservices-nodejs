const { consume } = require('../');

function startDevicesConsumers(repository) {
  consume({
    topic: 'devices2',
    callback(payload) {
      const { type } = payload;
      switch (type) {
        case 'CREATE_DEVICE_REQUEST_VALID': {
          console.info('Consume CREATE_DEVICE_REQUEST_VALID message');
          const {
            name, mac, userId, organizationId
          } = payload;

          repository.createDevice({
            name, mac, organizationId, userId
          });

          break;
        }

        default:
          break;
      }
    }
  });
}

module.exports = {
  startDevicesConsumers
};
