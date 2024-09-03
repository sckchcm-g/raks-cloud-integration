const axios = require('axios');
const Config = require('../config/dropboxConfig');

class DropboxController {
  static authorize(req, res) {
    const authUrl = `${Config.dropboxAuthUrl}?client_id=${Config.dropboxAppKey}&response_type=code&redirect_uri=${Config.dropboxRedirectUri}`;
    res.redirect(authUrl);
  }

  static async callback(req, res) {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
      const response = await axios.post(Config.dropboxTokenUrl, new URLSearchParams({
        code: code,
        grant_type: 'authorization_code',
        client_id: Config.dropboxAppKey,
        client_secret: Config.dropboxAppSecret,
        redirect_uri: Config.dropboxRedirectUri,
      }));

      const accessToken = response.data.access_token;
      // Store the access token securely (e.g., in a session, database, etc.)
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to exchange authorization code for access token' });
    }
  }
}

module.exports = DropboxController;