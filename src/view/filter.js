import { FILTER_TYPE } from '../constants/constants.js';
import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filterType, isAvailable) {
  const type = filterType.toLowerCase();

  return `
    <div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${filterType === 'Everything' && isAvailable ? 'checked' : ''}
        ${isAvailable ? '' : 'disabled'}
      >
      <label
        class="trip-filters__filter-label ${isAvailable ? '' : 'trip-filters__filter-label--disabled'}"
        for="filter-${type}"
      >
        ${filterType}
      </label>
    </div>
  `;
}

function createFilterTemplate(availableFilters) {
  const filterItems = FILTER_TYPE.map((filterType) =>
    createFilterItemTemplate(
      filterType,
      availableFilters[filterType.toLowerCase()],
    ),
  ).join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItems}
    </form>
  `;
}

export default class Filter extends AbstractView {
  #onFilterChange = null;

  constructor({ availableFilters, onFilterChange }) {
    super();
    this.availableFilters = availableFilters;
    this.#onFilterChange = onFilterChange;
  }

  get template() {
    return createFilterTemplate(this.availableFilters);
  }

  setFilterChangeHandler() {
    this.element.addEventListener('change', (event) => {
      this.#onFilterChange(event.target.value);
    });
  }
}
