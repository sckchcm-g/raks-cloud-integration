module.exports = {
  authUrl: 'https://www.dropbox.com/oauth2/authorize',
  tokenUrl: 'https://api.dropboxapi.com/oauth2/token',
  clientId: process.env.DROPBOX_CLIENT_ID,
  clientSecret: process.env.DROPBOX_CLIENT_SECRET,
  redirectUri: process.env.DROPBOX_REDIRECT_URI,
  scope: 'file_requests.write sharing.write sharing.read',
};