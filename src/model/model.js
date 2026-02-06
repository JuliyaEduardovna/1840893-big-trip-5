import { POINTS } from '../mocks/points.js';
import { DESTINATIONS } from '../mocks/destinations.js';
import { OFFERS } from '../mocks/offers.js';

export default class Model {
  #points = POINTS;
  #destinations = DESTINATIONS;
  #offers = OFFERS;

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getOffersWithSelected(point) {
    const offersForType = this.#offers.find(
      (group) => group.type === point.type,
    );

    const allOffers = offersForType ? offersForType.offers : [];

    const mergedOffers = allOffers.map((offer) => ({
      ...offer,
      selected: point.offers.some(
        (selectedOffer) => selectedOffer.id === offer.id,
      ),
    }));

    return mergedOffers;
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point,
    );
  }
}
