const BaseService = require('./baseService');
const config = require('../config/figmaConfig');

class Figma extends BaseService {
  constructor() {
    super(config);
  }

  // Define service-specific methods if needed
}

module.exports = Figma;