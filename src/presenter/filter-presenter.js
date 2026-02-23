import Filter from '../view/filter.js';
import { render } from '../framework/render.js';
import dayjs from 'dayjs';

export default class FilterPresenter {
  #filterComponent = null;
  #headerContainer = null;
  #pointsModel = null;
  #filterModel = null;

  constructor({ headerContainer, pointsModel, filterModel }) {
    this.#headerContainer = headerContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
  }

  init() {
    const points = this.#pointsModel.points;
    const availableFilters = this.#getAvailableFilters(points);

    this.#filterComponent = new Filter({
      availableFilters,
      onFilterChange: (filterType) => {
        this.#filterModel.filter = filterType;
      },
    });

    render(this.#filterComponent, this.#headerContainer);
    this.#filterComponent.setFilterChangeHandler();
  }

  #getAvailableFilters(points) {
    const now = dayjs();

    return {
      everything: points.length > 0,
      future: points.some((point) => dayjs(point.dateFrom).isAfter(now)),
      present: points.some(
        (point) =>
          dayjs(point.dateFrom).isBefore(now) &&
          dayjs(point.dateTo).isAfter(now),
      ),
      past: points.some((point) => dayjs(point.dateTo).isBefore(now)),
    };
  }
}
