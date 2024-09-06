const OauthBaseController = require('../controllers/OauthBaseController');
const axios = require('axios');
const logger = require('../utils/logger');

class BaseService extends OauthBaseController {
  constructor(config) {
    super(config);
    if (new.target === BaseService) {
      throw new TypeError("Cannot construct BaseService instances directly");
    }
    this.serviceName = this.constructor.name.toLowerCase();
    logger.info(`${this.constructor.name} initialized.`);
  }

  async makeRequest(method, urlPath, data = null, customHeaders = {}) {
    const url = `https://api.${this.serviceName}.com/${urlPath}`;
    logger.info(`${this.constructor.name} making ${method} request to ${url}`);
    
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders
    };

    const options = {
      method,
      headers,
      data,
      url
    };

    return await axios(options);
  }
}

module.exports = BaseService;