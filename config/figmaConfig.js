const crypto = require('crypto');

module.exports = {
  authUrl: 'https://www.figma.com/oauth',
  tokenUrl: 'https://www.figma.com/api/oauth/token',
  clientId: process.env.FIGMA_CLIENT_ID,
  clientSecret: process.env.FIGMA_CLIENT_SECRET,
  redirectUri: process.env.FIGMA_REDIRECT_URI,
  scope: 'files:read,file_comments:write',
  state: crypto.randomBytes(16).toString('hex'),
};