import { DESTINATIONS } from '../mocks/destinations.js';

export default class DestinationsModel {
  #destinations = DESTINATIONS;

  getDestinations() {
    return this.#destinations;
  }

  setDestinations(destinations) {
    this.#destinations = destinations;
  }
}
