import { DESTINATIONS } from '../mocks/destinations.js';

export default class DestinationsModel {
  #destinations = DESTINATIONS;

  get destinations() {
    return this.#destinations;
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }
}
