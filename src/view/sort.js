import { SORT_TYPE } from '../constants/constants.js';
import AbstractView from '../framework/view/abstract-view.js';

function createSortTemplate(currentSortType) {
  const sortItems = SORT_TYPE.map((type) => {
    const typeLowerCase = type.toLowerCase();
    const disabled = type === 'Event' || type === 'Offer';
    const checked = type === currentSortType ? 'checked' : '';

    return `
      <div class="trip-sort__item trip-sort__item--${typeLowerCase}">
        <input
          id="sort-${typeLowerCase}"
          class="trip-sort__input visually-hidden"
          type="radio"
          name="trip-sort"
          value="${type}"
          ${disabled ? 'disabled' : ''}
          ${checked}
          data-sort-type="${type}"
        >
        <label class="trip-sort__btn" for="sort-${typeLowerCase}">
          ${type}
        </label>
      </div>
    `;
  }).join('');

  return `
    <form class="trip-events__trip-sort trip-sort" action="#" method="get">
      ${sortItems}
    </form>
  `;
}

export default class Sort extends AbstractView {
  #handleSortChange = null;
  #currentSortType = null;

  constructor({ onSortTypeChange, currentSortType = 'Day' }) {
    super();
    this.#handleSortChange = onSortTypeChange;
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHandler() {
    this.element.addEventListener('click', (evt) => {
      const input = evt.target.closest('input');
      if (input && !input.disabled) {
        this.#currentSortType = input.dataset.sortType;
        this.#handleSortChange(input.dataset.sortType);
      }
    });
  }
}
