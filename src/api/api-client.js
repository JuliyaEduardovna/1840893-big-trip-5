import ApiService from '../framework/api-service.js';

export default class ApiClient extends ApiService {
  async getPoints() {
    const response = await this._load({ url: 'points' });
    return await ApiService.parseResponse(response);
  }

  async getDestinations() {
    const response = await this._load({ url: 'destinations' });
    return await ApiService.parseResponse(response);
  }

  async getOffers() {
    const response = await this._load({ url: 'offers' });
    return await ApiService.parseResponse(response);
  }
}
