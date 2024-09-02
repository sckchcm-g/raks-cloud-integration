const dotenv = require('dotenv');
dotenv.config();

class FigmaConfig {
  static get figmaClientId() {
    return process.env.FIGMA_CLIENT_ID;
  }

  static get figmaClientSecret() {
    return process.env.FIGMA_CLIENT_SECRET;
  }

  static get figmaRedirectUri() {
    return process.env.FIGMA_REDIRECT_URI;
  }

  static get figmaAuthUrl() {
    return 'https://www.figma.com/oauth';
  }

  static get figmaTokenUrl() {
    return 'https://www.figma.com/api/oauth/token';
  }
}

module.exports = FigmaConfig;