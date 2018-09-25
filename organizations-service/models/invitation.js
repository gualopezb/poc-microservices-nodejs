const mongoose = require('mongoose');

const { Schema } = mongoose;

const InvitationSchema = new Schema({
  status: {
    type: String,
    default: 'PENDING'
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization'
  },
  userInvited: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Invitation', InvitationSchema);
