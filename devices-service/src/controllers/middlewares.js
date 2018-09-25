function* checkRequiredParams(next) {
  this.checkBody('name').notEmpty();
  this.checkBody('mac').notEmpty();
  this.checkBody('organizationId').notEmpty();
  this.checkBody('userId').notEmpty();

  if (this.errors) {
    const e = new Error();
    e.status = 400;
    e.message = this.errors;
    throw e;
  }

  yield next;
}

function* checkMacFormat(next) {
  this.checkBody('mac').match(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);

  if (this.errors) {
    const e = new Error();
    e.status = 400;
    e.message = this.errors;
    throw e;
  }

  yield next;
}

function checkUniqueMac(findDeviceByMac) {
  return function* (next) {
    const { body: { mac } } = this.request;
    const device = yield findDeviceByMac(mac);

    if (device) {
      const e = new Error();
      e.status = 422;
      e.message = `A device with mac ${mac} already exists.`;
      throw e;
    }

    yield next;
  };
}

function updateDeviceNameStatus(updateDevice) {
  return function* (next) {
    const { id } = this.params;
    const { body: { name, status } } = this.request;
    const device = yield updateDevice({ id, name, status });

    if (!device) {
      const e = new Error();
      e.status = 404;
      e.message = 'Device not found';
      throw e;
    }

    yield next;
  };
}

module.exports = {
  checkRequiredParams,
  checkMacFormat,
  checkUniqueMac,
  updateDeviceNameStatus
};
