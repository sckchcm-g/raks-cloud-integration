const OauthBaseController = require('../controllers/OauthBaseController');
const config = require('../config/figmaConfig');

class Figma extends OauthBaseController {
  constructor() {
    super(config);
  }
}

module.exports = new Figma();