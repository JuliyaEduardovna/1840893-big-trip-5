export default class DestinationsModel {
  #destinations = [];

  get destinations() {
    return this.#destinations;
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }
}
