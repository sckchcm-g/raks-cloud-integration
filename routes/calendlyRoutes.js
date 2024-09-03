const express = require('express');
const calendlyController = require('../controllers/calendlyController');

const router = express.Router();

router.get('/authorize', calendlyController.authorize);
router.get('/callback', calendlyController.callback);

module.exports = router;