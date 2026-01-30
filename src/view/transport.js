import { TRANSPORT_TYPE } from '../constants/constants.js';
import AbstractView from '../framework/view/abstract-view.js';

function createTransportItemTemplate(transportType) {
  const type = transportType.toLowerCase();

  return `
    <div class="event__type-item">
      <input
        id="event-type-${type}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${type}"
      >
      <label
        class="event__type-label event__type-label--${type}"
        for="event-type-${type}-1"
      >
        ${transportType}
      </label>
    </div>
  `;
}

function createTransportTemplate() {
  return `
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${TRANSPORT_TYPE.map((type) => createTransportItemTemplate(type)).join('')}
    </fieldset>
  `;
}

export default class Transport extends AbstractView {
  get template() {
    return createTransportTemplate();
  }
}
