const express = require('express');
const DropboxController = require('../controllers/DropboxController');

const router = express.Router();

router.get('/authorize', DropboxController.authorize);
router.get('/callback', DropboxController.callback);

module.exports = router;