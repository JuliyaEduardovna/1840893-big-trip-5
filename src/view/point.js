import { createElement } from '../render.js';
import { formatDuration } from '../utils/utils.js';
import dayjs from 'dayjs';

function createPointTemplate(point) {
  const {
    type,
    destination,
    basePrice,
    offers = [],
    dateFrom,
    dateTo,
    isFavorite,
  } = point;

  const eventDate = dayjs(dateFrom);
  const startTime = eventDate.format('HH:mm');
  const endTime = dayjs(dateTo).format('HH:mm');
  const duration = formatDuration(dateFrom, dateTo);

  const offersTemplate = offers.length
    ? offers.map(({ title, price }) => `
        <li class="event__offer">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;<span class="event__offer-price">${price}</span>
        </li>
      `).join('')
    : '';

  return `
    <div class="event">
      <time class="event__date" datetime="${eventDate.format('YYYY-MM-DD')}">
        ${eventDate.format('MMM DD')}
      </time>

      <div class="event__type">
        <img
          class="event__type-icon"
          width="42"
          height="42"
          src="img/icons/${type}.png"
          alt="Event type icon"
        >
      </div>

      <h3 class="event__title">
        ${type} ${destination.name}
      </h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time">${startTime}</time>
          &mdash;
          <time class="event__end-time">${endTime}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>

      ${offers.length ? `
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
      ` : ''}

      <button
        class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}"
        type="button"
      >
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.229 4.326 1.572-9.163L0.685 9.674l9.201-1.337L14 0l4.115 8.337 9.2 1.337-6.657 6.489 1.572 9.163L14 21z"/>
        </svg>
      </button>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  `;
}

export default class Point {
  constructor(point) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
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
