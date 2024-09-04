const OauthBaseController = require('../controllers/OauthBaseController');
const config = require('../config/dropboxConfig');

class Dropbox extends OauthBaseController {
  constructor() {
    super(config);
  }
}

module.exports = new Dropbox();