import Sort from '../view/sort.js';
import Board from '../view/board.js';
import Message from '../view/message.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { MESSAGE_FOR_EMPTY_LIST } from '../constants/constants.js';
import dayjs from 'dayjs';

export default class ListPresenter {
  #boardComponent = null;
  #sortComponent = null;
  #boardContainer = null;
  #model = null;
  #pointPresenters = new Map();
  #currentSortType = 'Day';
  #points = [];

  constructor({ boardContainer, model }) {
    this.#boardContainer = boardContainer;
    this.#model = model;
  }

  init(points) {
    this.#points = [...points];
    this.#currentSortType = 'Day';

    this.#boardContainer.innerHTML = '';

    this.#boardComponent = new Board();

    render(this.#boardComponent, this.#boardContainer);

    this.#renderSort();

    const sortedPoints = this.#sortPoints(this.#points, this.#currentSortType);
    this.#renderPoints(sortedPoints);
  }

  #renderSort() {
    if (this.#sortComponent) {
      this.#sortComponent.element.remove();
    }

    this.#sortComponent = new Sort({
      onSortTypeChange: (sortType) => {
        if (sortType !== this.#currentSortType) {
          this.#currentSortType = sortType;

          this.#pointPresenters.forEach((presenter) => presenter.destroy());
          this.#pointPresenters.clear();

          const sortedPoints = this.#sortPoints(this.#points, sortType);
          this.#renderPoints(sortedPoints);
        }
      },
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler();
  }

  #renderPoints(points) {
    this.#boardComponent.element.innerHTML = '';

    if (points.length === 0) {
      const message = new Message({ message: MESSAGE_FOR_EMPTY_LIST });
      render(message, this.#boardComponent.element);
      return;
    }

    points.forEach((point) => {
      this.#createPoint(point);
    });
  }

  #createPoint(point) {
    const pointPresenter = new PointPresenter({
      container: this.#boardComponent.element,
      point,
      model: this.#model,
      onViewChange: () => this.#pointPresenters.forEach((presenter) => presenter.resetView()),
      onDataChange: (updatedPoint) => {
        this.#model.updatePoint(updatedPoint);

        this.#points = this.#points.map((p) =>
          p.id === updatedPoint.id ? updatedPoint : p
        );

        this.#pointPresenters.forEach((p) => p.destroy());
        this.#pointPresenters.clear();
        const sortedPoints = this.#sortPoints(this.#points, this.#currentSortType);
        this.#renderPoints(sortedPoints);
      },
    });

    pointPresenter.init();
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(points, sortType) {
    const sortedPoints = [...points];

    if (sortType === 'Day') {
      return sortedPoints.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
    }

    if (sortType === 'Time') {
      return sortedPoints.sort((a, b) => {
        const timeA = dayjs(a.dateTo).diff(dayjs(a.dateFrom));
        const timeB = dayjs(b.dateTo).diff(dayjs(b.dateFrom));
        return timeB - timeA;
      });
    }

    if (sortType === 'Price') {
      return sortedPoints.sort((a, b) => b.basePrice - a.basePrice);
    }

    return sortedPoints;
  }
}
