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
    render(new Filter(), this.#headerContainer);

    /* Sort */
    render(new Sort(), this.#boardContainer, RenderPosition.AFTERBEGIN);

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
}
