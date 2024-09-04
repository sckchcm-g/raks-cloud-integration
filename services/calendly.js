const OauthBaseController = require('../controllers/OauthBaseController');
const config = require('../config/calendlyConfig');

class Calendly extends OauthBaseController {
  constructor() {
    super(config);
  }
}

module.exports = new Calendly();