const express = require('express');
const OAuthController = require('../controllers/oauthController');

const router = express.Router();

router.get('/authorize', OAuthController.authorize);
router.get('/callback', OAuthController.callback);

module.exports = router;