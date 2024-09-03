const axios = require('axios');
const config = require('../config/calendlyConfig');

class calendlyController {
  static authorize(req, res) {
    const authUrl = `${config.calendlyAuthUrl}?client_id=${config.clientId}&response_type=code&redirect_uri=${config.redirectUri}`;
    res.redirect(authUrl);
  }

  static async callback(req, res) {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
      const response = await axios.post(config.calendlyTokenUrl, new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }));

      const accessToken = response.data.access_token;
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to exchange authorization code for access token' });
    }
  }
}

module.exports = calendlyController;