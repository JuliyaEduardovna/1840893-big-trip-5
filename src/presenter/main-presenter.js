import ListPresenter from './list-presenter.js';
import Filter from '../view/filter.js';
import TripInfo from '../view/trip-info.js';
import { render, RenderPosition } from '../framework/render.js';
import dayjs from 'dayjs';

export default class MainPresenter {
  #boardContainer = null;
  #headerContainer = null;
  #model = null;
  #currentFilter = 'everything';
  #listPresenter = null;

  constructor({ boardContainer, headerContainer, model }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#model = model;
  }

  init() {
    const points = this.#model.points;

    /* Header */
    render(new TripInfo(), this.#headerContainer, RenderPosition.AFTERBEGIN);

    /* Available filters */
    const availableFilters = this.#getAvailableFilters(points);
    const filterComponent = new Filter({
      availableFilters,
      onFilterChange: (filterType) => {
        this.#currentFilter = filterType;
        const filteredPointsByFilter = this.#filterPoints(points, filterType);
        this.#listPresenter.init(filteredPointsByFilter);
      },
    });

    render(filterComponent, this.#headerContainer);
    filterComponent.setFilterChangeHandler();

    /* Points List */
    const filteredPoints = this.#filterPoints(points, this.#currentFilter); // ЭТО ОСТАВЛЯЕМ
    this.#listPresenter = new ListPresenter({
      boardContainer: this.#boardContainer,
      model: this.#model,
    });

    this.#listPresenter.init(filteredPoints);
  }

  #filterPoints(points, filterType) {
    const now = dayjs();

    switch (filterType) {
      case 'future':
        return points.filter((point) => dayjs(point.dateFrom).isAfter(now));

      case 'present':
        return points.filter(
          (point) =>
            dayjs(point.dateFrom).isBefore(now) &&
            dayjs(point.dateTo).isAfter(now),
        );

      case 'past':
        return points.filter((point) => dayjs(point.dateTo).isBefore(now));

      case 'everything':
      default:
        return [...points];
    }
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
