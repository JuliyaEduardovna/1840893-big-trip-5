import { SORT_TYPE } from '../constants/constants.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortItemTemplate(sortType) {
  const type = sortType.toLowerCase();

  return `
    <div class="trip-sort__item trip-sort__item--${type}">
      <input
        id="sort-${type}"
        class="trip-sort__input visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${type}"
      >
      <label class="trip-sort__btn" for="sort-${type}">
        ${sortType}
      </label>
    </div>
  `;
}

function createSortTemplate() {
  return `
    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${SORT_TYPE.map((type) => createSortItemTemplate(type)).join('')}
    </form>
  `;
}

export default class Sort extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
