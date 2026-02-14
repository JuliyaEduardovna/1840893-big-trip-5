import Transport from './transport.js';
import Offer from './offer.js';
import dayjs from 'dayjs';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getInitialPointState } from '../utils/utils.js';

function createFormCreateTemplate(point, destinations) {
  const {
    type = 'taxi',
    destination = { name: '', description: '', pictures: [] },
    basePrice = '',
    dateFrom = dayjs(),
    dateTo = dayjs(),
    offers = []
  } = point;

  const { description: destDescription, pictures = [] } = destination;

  const formattedDateFrom = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const formattedDateTo = dayjs(dateTo).format('DD/MM/YY HH:mm');

  return `
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img
              class="event__type-icon"
              width="17"
              height="17"
              src="img/icons/${type}.png"
              alt="Event type icon"
            >
          </label>

          <input
            class="event__type-toggle visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
          >

          <div class="event__type-list">
            ${new Transport().template}
          </div>
        </div>

        <div class="event__field-group event__field-group--destination">
          <label class="event__label event__type-output" for="event-destination-1">
            ${type.charAt(0).toUpperCase() + type.slice(1)}
          </label>

          <input
            class="event__input event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${destination.name}"
            list="destination-list-1"
          >

          <datalist id="destination-list-1">
              ${destinations?.map((dest) => `
                <option value="${dest.name}"></option>
                `).join('') || ''}
          </datalist>
        </div>

        <div class="event__field-group event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input
            class="event__input event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${formattedDateFrom}"
          >
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${formattedDateTo}"
          >
        </div>

        <div class="event__field-group event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input
            class="event__input event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${basePrice}"
          >
        </div>

        <button class="event__save-btn btn btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>

      <section class="event__details">
        <section class="event__section event__section--offers">
          <h3 class="event__section-title event__section-title--offers">Offers</h3>
          ${new Offer(offers).template}
        </section>

        <section class="event__section event__section--destination">
          <h3 class="event__section-title event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destDescription}</p>

          ${pictures ? `
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures.map((picture) => `
                  <img class="event__photo" src="${picture.src}" alt="${picture.description || 'Photo'}">
                `).join('')}
              </div>
            </div>
          ` : ''}
        </section>
      </section>
    </form>
  `;
}

export default class CreateForm extends AbstractStatefulView {
  #onSubmitButtonClick = null;
  #destinations = null;
  #offersByType = null;

  constructor({ point = {}, onSubmitButtonClick, destinations, offersByType }) {
    super();
    this.#onSubmitButtonClick = onSubmitButtonClick;
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    const initialState = getInitialPointState(point);

    const offersForType = this.#offersByType?.find((group) => group.type === initialState.type);

    initialState.offers = offersForType
      ? offersForType.offers.map((offer) => ({ ...offer, selected: false }))
      : [];

    this._setState(initialState);

    this._restoreHandlers();
  }

  get template() {
    return createFormCreateTemplate(this._state, this.#destinations);
  }

  _restoreHandlers() {
    const form = this.element;
    form.addEventListener('submit', this.#submitButtonClickHandler);

    const typeLabels = this.element.querySelectorAll('.event__type-label');
    typeLabels.forEach((label) => {
      label.addEventListener('click', this.#typeLabelClickHandler);
    });

    const destinationInput = this.element.querySelector('.event__input--destination');
    if (destinationInput) {
      destinationInput.addEventListener('change', this.#destinationChangeHandler);
    }
  }

  #typeLabelClickHandler = (evt) => {
    evt.preventDefault();

    const label = evt.currentTarget;
    const typeText = label.textContent.trim();
    const newType = typeText.toLowerCase();

    const offersForType = this.#offersByType.find((group) => group.type === newType);

    if (!offersForType) {
      return;
    }

    const newOffers = offersForType.offers.map((offer) => ({
      ...offer,
      selected: false
    }));

    this.updateElement({
      type: newType,
      offers: newOffers
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationName = evt.target.value;

    const selectedDestination = this.#destinations.find(
      (dest) => dest.name === destinationName
    );

    if (selectedDestination) {
      this.updateElement({
        destination: selectedDestination
      });
    }
  };

  #submitButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitButtonClick(this._state);
  };
}
