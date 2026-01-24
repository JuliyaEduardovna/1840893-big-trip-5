import { createElement } from '../render.js';
import { OFFERS } from '../constants/constants.js';

function createOfferItemTemplate(offerType) {
  const offer = offerType[0];
  const title = offerType[1];
  const price = offerType[2];

  return `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer}-1"
        type="checkbox"
        name="event-offer-${offer}"
        checked
      >
      <label class="event__offer-label" for="event-offer-${offer}-1">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
}

function createOfferTemplate() {
  return `
    <div class="event__available-offers">
      ${OFFERS.map((offerType) => createOfferItemTemplate(offerType)).join('')}
    </div>
  `;
}

export default class Offer {
  getTemplate() {
    return createOfferTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
