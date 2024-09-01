const express = require('express');
const DropboxController = require('../controllers/DropboxController');

const router = express.Router();

router.get('/authorize', DropboxController.authorize);
router.get('/callback', DropboxController.callback);
router.post('/add_template', DropboxController.addTemplate);
router.post('/get_template', DropboxController.getTemplate);
router.post('/list_templates', DropboxController.listTemplates);
router.post('/remove_template', DropboxController.removeTemplate);

module.exports = router;