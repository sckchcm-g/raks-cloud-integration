const axios = require('axios');
const FigmaConfig = require('../config/figmaConfig');
const crypto = require('crypto');

class FigmaController {
  static authorize(req, res) {
    const state = crypto.randomBytes(16).toString('hex');
    const scope = 'files:read,file_comments:write'; 
    const authUrl = `${FigmaConfig.figmaAuthUrl}?client_id=${FigmaConfig.figmaClientId}&redirect_uri=${FigmaConfig.figmaRedirectUri}&scope=${scope}&state=${state}&response_type=code`;
    res.redirect(authUrl);
  }

  static async callback(req, res) {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }
    try {
      const response = await axios.post(FigmaConfig.figmaTokenUrl, new URLSearchParams({
        client_id: FigmaConfig.figmaClientId,
        client_secret: FigmaConfig.figmaClientSecret,
        redirect_uri: FigmaConfig.figmaRedirectUri,
        code: code,
        grant_type: 'authorization_code',
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

module.exports = FigmaController;