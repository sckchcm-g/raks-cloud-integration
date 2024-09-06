const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const servicesPath = path.join(__dirname, '../services');

fs.readdirSync(servicesPath).forEach(file => {
  const serviceName = path.basename(file, '.js');
  const ServiceClass = require(path.join(servicesPath, file));

  // Single route to handle all tasks using makeRequest
  router.post(`/${serviceName}/request`, async (req, res) => {
    const service = new ServiceClass();
    const { method, urlPath, data, headers } = req.body;
    try {
      const response = await service.makeRequest(method, urlPath, data, headers);
      res.json(response.data);
    } catch (err) {
      res.status(500).json(err.response ? err.response.data : { error: err.message });
    }
  });
});

module.exports = router;