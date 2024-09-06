const BaseService = require('./baseService');
const config = require('../config/dropboxConfig');

class Dropbox extends BaseService {
  constructor() {
    super(config);
  }

  // Method to create a file request
  async createFileRequest(data) {
    const urlPath = '2/file_requests/create';
    const method = 'POST';
    return await this.makeRequest(method, urlPath, data);
  }

  // Method to delete a batch of closed file requests
  async deleteFileRequests(data) {
    const urlPath = '2/file_requests/delete';
    const method = 'POST';
    return await this.makeRequest(method, urlPath, data);
  }

  // Method to list file requests owned by the user
  async listFileRequests(data) {
    const urlPath = '2/file_requests/list_v2';
    const method = 'POST';
    return await this.makeRequest(method, urlPath, data);
  }
}

module.exports = Dropbox;