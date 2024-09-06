const BaseService = require('./baseService');
const config = require('../config/calendlyConfig');

class Calendly extends BaseService {
  constructor() {
    super(config);
  }

  // Method to get the current user's information
  async getUserInfo(headers) {
    const urlPath = 'users/me';
    const method = 'GET';
    return await this.makeRequest(method, urlPath, null, headers);
  }

  // Method to send an invitation to an organization
  async sendInvitation(organizationUuid, email, headers) {
    const urlPath = `organizations/${organizationUuid}/invitations`;
    const method = 'POST';
    const data = { email };
    return await this.makeRequest(method, urlPath, data, headers);
  }

  // Method to delete an invitation from an organization
  async deleteInvitation(organizationUuid, userId, headers) {
    const urlPath = `organizations/${organizationUuid}/invitations/${userId}`;
    const method = 'DELETE';
    return await this.makeRequest(method, urlPath, null, headers);
  }
}

module.exports = Calendly;