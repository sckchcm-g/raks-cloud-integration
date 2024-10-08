const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const servicesPath = path.join(__dirname, '../services');

fs.readdirSync(servicesPath).forEach(file => {
  const serviceName = path.basename(file, '.js');
  const ServiceClass = require(path.join(servicesPath, file));

  router.get(`/${serviceName}/authorize`, (req, res) => {
    const service = new ServiceClass();
    service.authorize(req, res);
  });

  router.get(`/${serviceName}/callback`, (req, res) => {
    const service = new ServiceClass();
    service.callback(req, res);
  });
});

module.exports = router;