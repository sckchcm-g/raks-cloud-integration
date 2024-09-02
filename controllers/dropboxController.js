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

  static async addTemplate(req, res) {
    const { description, fields, name } = req.body;

    try {
      const response = await axios.post('https://api.dropboxapi.com/2/file_properties/templates/add_for_team', {
        description,
        fields,
        name,
      }, {
        headers: {
          'Authorization': `Bearer ${Config.dropboxAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error adding template:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to add template' });
    }
  }

  static async getTemplate(req, res) {
    const { template_id } = req.body;

    try {
      const response = await axios.post('https://api.dropboxapi.com/2/file_properties/templates/get_for_team', {
        template_id,
      }, {
        headers: {
          'Authorization': `Bearer ${Config.dropboxAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error getting template:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to get template' });
    }
  }

  static async listTemplates(req, res) {
    try {
      const response = await axios.post('https://api.dropboxapi.com/2/file_properties/templates/list_for_team', {}, {
        headers: {
          'Authorization': `Bearer ${Config.dropboxAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error listing templates:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to list templates' });
    }
  }

  static async removeTemplate(req, res) {
    const { template_id } = req.body;

    try {
      const response = await axios.post('https://api.dropboxapi.com/2/file_properties/templates/remove_for_team', {
        template_id,
      }, {
        headers: {
          'Authorization': `Bearer ${Config.dropboxAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error removing template:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to remove template' });
    }
  }
}

module.exports = DropboxController;