module.exports = {
  authUrl: 'https://auth.calendly.com/oauth/authorize',
  tokenUrl: 'https://auth.calendly.com/oauth/token',
  clientId: process.env.CALENDLY_CLIENT_ID,
  clientSecret: process.env.CALENDLY_CLIENT_SECRET,
  redirectUri: process.env.CALENDLY_REDIRECT_URI,
};