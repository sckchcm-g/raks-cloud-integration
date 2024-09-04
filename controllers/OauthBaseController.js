const axios = require('axios');
const logger = require('../utils/logger');

class OauthBaseController {
  constructor(config) {
    this.config = config;
    logger.info(`${this.constructor.name} initialized with config: ${JSON.stringify(config)}`);
  }

  authorize(req, res) {
    logger.info(`${this.constructor.name}: Authorize method called`);
    let authUrl = `${this.config.authUrl}?client_id=${this.config.clientId}&response_type=code&redirect_uri=${this.config.redirectUri}`;
    if (this.config.scope) {
      authUrl += `&scope=${this.config.scope}`;
    }
    if (this.config.state) {
      authUrl += `&state=${this.config.state}`;
    }
    res.redirect(authUrl);
  }

  async callback(req, res) {
    logger.info(`${this.constructor.name}: Callback method called`);
    const { code } = req.query;

    if (!code) {
      logger.error(`${this.constructor.name}: Authorization code is missing`);
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
      const response = await axios.post(this.config.tokenUrl, new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.config.redirectUri,
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
      }));

      const accessToken = response.data.access_token;
      logger.info(`${this.constructor.name}: Access token received`);
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      logger.error(`${this.constructor.name}: Error exchanging code for token: ${error.response?.data || error.message}`);
      res.status(500).json({ error: 'Failed to exchange authorization code for access token' });
    }
  }
}

module.exports = OauthBaseController;