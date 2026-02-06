import Sort from '../view/sort.js';
import Filter from '../view/filter.js';
import Board from '../view/board.js';
import TripInfo from '../view/trip-info.js';
import { render, RenderPosition } from '../framework/render.js';
import PointPresenter from './point-presenter.js';

export default class Presenter {
  #boardComponent = new Board();
  #boardContainer = null;
  #headerContainer = null;
  #model = null;
  #pointPresenters = new Map();

  constructor({ boardContainer, headerContainer, model }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#model = model;
    this.#currentSortType = 'Day';
    this.#currentFilter = 'everything';
  }

  resetView = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #updatePoint = (updatedPoint) => {
    this.#model.updatePoint(updatedPoint);
    const pointPresenter = this.#pointPresenters.get(updatedPoint.id);
    if (pointPresenter) {
      pointPresenter.updatePoint(updatedPoint);
    }
  };

  init() {
    const points = this.#model.points;

    render(this.#boardComponent, this.#boardContainer);

    /* Header */
    render(new TripInfo(), this.#headerContainer, RenderPosition.AFTERBEGIN);

    /* Available filters */
    const availableFilters = this.#getAvailableFilters(points);
    const filterComponent = new Filter({
      availableFilters,
      onFilterChange: (filterType) => {
        this.#currentFilter = filterType;
        this.#resetSort();
      },
    });

    render(filterComponent, this.#headerContainer);

    filterComponent.setFilterChangeHandler();

    /* Sort */
    this.#sortComponent = new Sort({
      onSortTypeChange: (sortType) => {
        this.#currentSortType = sortType;
      },
    });

    render(
      this.#sortComponent,
      this.#boardContainer,
      RenderPosition.AFTERBEGIN,
    );

    this.#sortComponent.setSortTypeChangeHandler();

    /* Message for empty list */
    if (points.length === 0) {
      const message = new Message({ message: MESSAGE_FOR_EMPTY_LIST });
      render(message, this.#boardContainer);
    }

    /* Create form */
    // const createForm = new CreateForm({
    //   point: {},
    // });

    // render(createForm, this.#boardContainer, RenderPosition.AFTERBEGIN);

    /* Points */
    points.forEach((point) => {
      const pointPresenter = new PointPresenter({
        container: this.#boardComponent.element,
        point,
        model: this.#model,
        onViewChange: this.resetView,
        onDataChange: this.#updatePoint,
      });

      pointPresenter.init();
      this.#pointPresenters.set(point.id, pointPresenter);
    });
  }

  /* Find an available filters for point */
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

  /* Reset sort to default ('Day') when filter changes */
  #resetSort() {
    this.#currentSortType = 'Day';
    if (this.#sortComponent) {
      this.#sortComponent.setActiveSort('Day');
    }
  }
}
