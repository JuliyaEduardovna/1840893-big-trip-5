export default class OffersModel {
  #offers = [];

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
    this.#offers = offers;
  }

  getOffersByType(type) {
    return this.#offers.find((group) => group.type === type);
  }

  getOffersWithSelected(point) {
    const offersForType = this.getOffersByType(point.type);
    const allOffers = offersForType ? offersForType.offers : [];

    return allOffers.map((offer) => ({
      ...offer,
      selected: point.offers.some(
        (selectedOffer) => selectedOffer.id === offer.id,
      ),
    }));
  }
}
