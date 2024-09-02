const express = require('express');
const FigmaController = require('../controllers/figmaController');

const router = express.Router();

router.get('/authorize', FigmaController.authorize);
router.get('/callback', FigmaController.callback);

module.exports = router;