import Sort from '../view/sort.js';
import Filter from '../view/filter.js';
import EditForm from '../view/form-edit.js';
import Point from '../view/point.js';
import Board from '../view/board.js';
import TripInfo from '../view/trip-info.js';
import BoardItem from '../view/board-item.js';
import { render, RenderPosition, replace } from '../framework/render.js';

export default class Presenter {
  #boardComponent = new Board();
  #boardContainer = null;
  #headerContainer = null;
  #model = null;

  constructor({ boardContainer, headerContainer, model }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#model = model;
  }

  init() {
    const points = this.#model.points;

    render(this.#boardComponent, this.#boardContainer);

    /* Header */
    render(new TripInfo(), this.#headerContainer, RenderPosition.AFTERBEGIN);
    render(new Filter(), this.#headerContainer);

    /* Sort */
    render(new Sort(), this.#boardContainer, RenderPosition.AFTERBEGIN);

    /* Points with the edit form */
    points.forEach((point) => {
      const boardItem = new BoardItem();
      render(boardItem, this.#boardComponent.element);

      const pointComponent = new Point({
        point: { ...point, offers: this.#model.getOffersWithSelected(point) },
        onOpenButtonClick: replacePointToEdit,
      });

      const editFormComponent = new EditForm({
        point: { ...point, offers: this.#model.getOffersWithSelected(point) },
        onCloseButtonClick: replaceEditToPoint,
        onSubmitButtonClick: replaceEditToPoint,
      });

      render(pointComponent, boardItem.element);

      /* Event Listeners */
      function replaceEditToPoint() {
        replace(pointComponent, editFormComponent);
        document.removeEventListener('keydown', escKeyDownHandler);
      }

      function replacePointToEdit() {
        replace(editFormComponent, pointComponent);
        document.addEventListener('keydown', escKeyDownHandler);
      }

      function escKeyDownHandler(evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          replaceEditToPoint();
        }
      }
    });
  }
}
