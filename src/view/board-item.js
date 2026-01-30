import AbstractView from '../framework/view/abstract-view.js';

function createBoardItemTemplate() {
  return '<li class="trip-events__item"></li>';
}

export default class BoardItem extends AbstractView {
  get template() {
    return createBoardItemTemplate();
  }
}
