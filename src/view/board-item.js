import { createElement } from '../render.js';

function createBoardItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class BoardItem {
  getTemplate() {
    return createBoardItemTemplate();
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
