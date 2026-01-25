import { POINTS } from '../mocks/points.js';
import { DESTINATIONS } from '../mocks/destinations.js';
import { OFFERS } from '../mocks/offers.js';

export default class Model {
  constructor() {
    this.points = POINTS;
    this.destinations = DESTINATIONS;
    this.offers = OFFERS;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
