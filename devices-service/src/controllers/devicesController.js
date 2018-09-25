const { produce } = require('../../utils/kafka');
const {
  checkRequiredParams,
  checkMacFormat,
  checkUniqueMac,
  updateDeviceNameStatus
} = require('./middlewares');

function createController(devicesRepository) {
  return {
    createDevice: [
      function* (next) {
        yield next;

        const {
          body: {
            name, mac, organizationId, userId
          }
        } = this.request;

        produce({
          topic: 'devices',
          messages: [{
            type: 'CREATE_DEVICE_REQUEST', name, mac, organizationId, userId
          }]
        }).then(data => console.log('Produced message: ', data));

        this.body = {
          message: 'Device is being created',
        };
      },
      checkRequiredParams,
      checkMacFormat,
      checkUniqueMac(devicesRepository.findDeviceByMac)
    ],

    updateDevice: [
      function* (next) {
        yield next;

        this.body = {
          message: 'Device was updated successfully'
        };
      },
      updateDeviceNameStatus(devicesRepository.updateDevice)
    ]
  };
}

module.exports = {
  createController
};
