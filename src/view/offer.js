import AbstractView from '../framework/view/abstract-view.js';

function createOfferTemplate(offers = []) {
  if (!offers.length) {
    return '<p class="event__available-offers">No additional offers</p>';
  }

  return `
    <div class="event__available-offers">
      ${offers.map((offer) => `
        <div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-${offer.id}"
            type="checkbox"
            name="event-offer"
            value="${offer.id || ''}"
            ${offer.selected ? 'checked' : ''}
          >
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>
      `).join('')}
    </div>
  `;
}

export default class Offer extends AbstractView {
  #offers = null;
  constructor(offers = []) {
    super();
    this.#offers = offers;
  }

  get template() {
    return createOfferTemplate(this.#offers);
  }
}
