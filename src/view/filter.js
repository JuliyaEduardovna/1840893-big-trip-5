import { createElement } from '../render.js';
import { FILTER_TYPE } from '../constants/constants.js';

function createFilterItemTemplate(filterType) {
  const type = filterType.toLowerCase();

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        checked
      >
      <label
        class="trip-filters__filter-label"
        for="filter-${type}"
      >
        ${filterType}
      </label>
    </div>
  `;
}

function createFilterTemplate() {
  return `
    <form class="trip-filters" action="#" method="get">
      ${FILTER_TYPE.map((type) => createFilterItemTemplate(type)).join('')}
    </form>
  `;
}

export default class Filter {
  getTemplate() {
    return createFilterTemplate();
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
