const axios = require('axios');

class OauthBaseController {
  constructor(config) {
    this.config = config;
  }

  authorize(req, res) {
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
    const { code } = req.query;

    if (!code) {
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
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to exchange authorization code for access token' });
    }
  }
}

module.exports = OauthBaseController;