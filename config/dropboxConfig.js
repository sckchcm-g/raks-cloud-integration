const dotenv = require('dotenv');
dotenv.config();

class Config {
  static get dropboxAppKey() {
    return process.env.DROPBOX_APP_KEY;
  }

  static get dropboxAppSecret() {
    return process.env.DROPBOX_APP_SECRET;
  }

  static get dropboxRedirectUri() {
    return process.env.DROPBOX_REDIRECT_URI;
  }

  static get dropboxAuthUrl() {
    return 'https://www.dropbox.com/oauth2/authorize';
  }

  static get dropboxTokenUrl() {
    return 'https://api.dropboxapi.com/oauth2/token';
  }
}

module.exports = Config;