import { FILTER_TYPE } from '../constants/constants.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filterType, currentFilter) {
  const type = filterType.toLowerCase();

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${currentFilter === type ? 'checked' : ''}
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

function createFilterTemplate(currentFilter) {
  const filterItems = FILTER_TYPE.map((filterType) =>
    createFilterItemTemplate(filterType, currentFilter)
  ).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
    </form>
  `;
}

export default class Filter extends AbstractView {
  #onFilterChange = null;
  #currentFilter = null;

  constructor({ currentFilter, onFilterChange }) {
    super();
    this.#currentFilter = currentFilter;
    this.#onFilterChange = onFilterChange;
  }

  get template() {
    return createFilterTemplate(this.#currentFilter);
  }

  setFilterChangeHandler() {
    this.element.addEventListener('change', (event) => {
      this.#onFilterChange(event.target.value);
    });
  }
}
