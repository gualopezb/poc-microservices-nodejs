class Device {
  constructor({
    id, name, status, mac, organizationId, userId, lastMessageDate
  }) {
    this.id = id;
    this.name = name;
    this.status = status;
    this.mac = mac;
    this.organizationId = organizationId;
    this.userId = userId;
    this.lastMessageDate = lastMessageDate;
  }
}

module.exports = Device;
