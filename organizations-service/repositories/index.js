const Organization = require('../models/organization');
const Invitation = require('../models/invitation');

const createOrganization = ({ userId, username }) => {
  const organization = new Organization({
    name: `${username.toUpperCase()} ORGANIZATION`,
    users: [
      {
        userId,
        username,
        admin: true
      }
    ]
  });

  return organization.save();
};

const createInvitation = ({ organization, userInvited }) => {
  const invitation = new Invitation({
    organization,
    userInvited,
  });

  return invitation.save();
};

const findOrganizationById = id => Organization.findById(id);

const acceptInvitation = id => Invitation.updateOne({
  _id: id
}, {
  status: 'ACCEPTED'
});

const findInvitationById = id => Invitation.findById(id);

const addMemberOnOrganization = ({
  organizationId, userInvited, username
}) => findOrganizationById(organizationId)
  .then((organization) => {
    organization.users.push({
      userId: userInvited,
      username,
      admin: false
    });
    return organization.save();
  });

module.exports = {
  createOrganization,
  createInvitation,
  findOrganizationById,
  acceptInvitation,
  findInvitationById,
  addMemberOnOrganization
};
