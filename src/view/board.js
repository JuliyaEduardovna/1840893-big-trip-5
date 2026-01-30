import AbstractView from '../framework/view/abstract-view.js';

function createBoardTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class Board extends AbstractView {
  get template() {
    return createBoardTemplate();
  }
}
