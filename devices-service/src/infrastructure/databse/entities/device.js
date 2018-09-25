const mongoose = require('mongoose');

const DeviceModel = require('../../../models/device');

const { Schema } = mongoose;

const DeviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'ACTIVE'
  },
  mac: {
    type: String,
    required: true,
    unique: true
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  lastMessageDate: Date
});

DeviceSchema.statics.toDeviceModel = (device) => {
  const {
    id, name, status, mac, organizationId, userId, lastMessageDate
  } = device;
  return new DeviceModel({
    id, name, status, mac, organizationId, userId, lastMessageDate
  });
};

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
