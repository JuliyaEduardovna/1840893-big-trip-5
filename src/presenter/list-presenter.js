import Sort from '../view/sort.js';
import Board from '../view/board.js';
import Message from '../view/message.js';
import PointPresenter from './point-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { MESSAGE_FOR_EMPTY_LIST, USER_ACTION } from '../constants/constants.js';
import dayjs from 'dayjs';

export default class ListPresenter {
  #boardComponent = null;
  #sortComponent = null;
  #boardContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointPresenters = new Map();
  #currentSortType = 'Day';
  #points = [];
  #currentFilter = 'everything';
  #onCloseCreateForm = null;

  constructor({ boardContainer, pointsModel, destinationsModel, offersModel, onCloseCreateForm }) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onCloseCreateForm = onCloseCreateForm;

    this.#pointsModel.addObserver(this.#handleModelChange);
  }

  resetSort() {
    this.#currentSortType = 'Day';
  }

  setViewState({ isCreating }) {
    if (isCreating) {
      this.#pointPresenters.forEach((presenter) => presenter.resetView());
      if (this.#onCloseCreateForm) {
        this.#onCloseCreateForm();
      }
    }
  }

  init(points, filterType) {
    this.#points = [...points];
    this.#currentSortType = 'Day';
    this.#currentFilter = filterType;

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
      currentSortType: this.#currentSortType,
    });

    render(
      this.#sortComponent,
      this.#boardContainer,
      RenderPosition.AFTERBEGIN,
    );
    this.#sortComponent.setSortTypeChangeHandler();
  }

  #renderPoints(points) {
    this.#boardComponent.element.innerHTML = '';

    if (points.length === 0) {
      const message = MESSAGE_FOR_EMPTY_LIST[this.#currentFilter];
      const messageComponent = new Message({ message });
      render(messageComponent, this.#boardComponent.element);
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
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onViewChange: () => {
        this.#pointPresenters.forEach((presenter) => presenter.resetView());
        if (this.#onCloseCreateForm) {
          this.#onCloseCreateForm();
        }
      },
      onDataChange: (actionType, updatedPoint) => {
        switch (actionType) {
          case USER_ACTION.UPDATE_POINT:
            this.#pointsModel.updatePoint(updatedPoint);
            break;
          case USER_ACTION.DELETE_POINT:
            this.#pointsModel.deletePoint(updatedPoint);
            break;
          case USER_ACTION.ADD_POINT:
            this.#pointsModel.addPoint(updatedPoint);
            break;
        }
      },
    });

    pointPresenter.init();
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #sortPoints(points, sortType) {
    const sortedPoints = [...points];

    if (sortType === 'Day') {
      return sortedPoints.sort((a, b) =>
        dayjs(a.dateFrom).diff(dayjs(b.dateFrom)),
      );
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

  #handleModelChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    const points = this.#pointsModel.points;
    this.#points = [...points];

    const sortedPoints = this.#sortPoints(this.#points, this.#currentSortType);
    this.#renderPoints(sortedPoints);
  };
}
