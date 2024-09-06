const BaseService = require('./baseService');
const config = require('../config/figmaConfig');

class Figma extends BaseService {
  constructor() {
    super(config);
  }

  // Method to get the current user's information
  async getUserInfo(headers) {
    const urlPath = 'v1/me';
    const method = 'GET';
    return await this.makeRequest(method, urlPath, null, headers);
  }
}

module.exports = Figma;