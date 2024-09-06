const BaseService = require('./baseService');
const config = require('../config/calendlyConfig');

class Calendly extends BaseService {
  constructor() {
    super(config);
  }
}

module.exports = Calendly;