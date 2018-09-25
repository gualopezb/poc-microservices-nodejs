function create({ Device }) {
  const createDevice = ({
    name, mac, organizationId, userId
  }) => {
    const device = new Device({
      name, status: 'ACTIVE', mac, organizationId, userId
    });

    return device.save();
  };

  const findDeviceByMac = mac => Device
    .findOne({ mac })
    .then(record => record && Device.schema.statics.toDeviceModel(record));

  const updateDevice = ({ id, name, status }) => Device
    .findOneAndUpdate({
      _id: id
    }, {
      name,
      status
    })
    .then(record => record && Device.schema.statics.toDeviceModel(record));

  return {
    createDevice,
    updateDevice,
    findDeviceByMac
  };
}

module.exports = {
  create
};
