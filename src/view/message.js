import AbstractView from '../framework/view/abstract-view';

function createMessageForEmptyListTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class Message extends AbstractView {
  #message = null;

  constructor({ message }) {
    super();
    this.#message = message;
  }

  get template() {
    return createMessageForEmptyListTemplate(this.#message);
  }
}
