import { render, RenderPosition } from '../render.js';
import Sort from '../view/sort.js';
import Filter from '../view/filter.js';
import CreateForm from '../view/form-create.js';
import EditForm from '../view/form-edit.js';
import Point from '../view/point.js';
import Board from '../view/board.js';
import TripInfo from '../view/trip-info.js';
import BoardItem from '../view/board-item.js';

export default class Presenter {
  boardComponent = new Board();

  constructor({ boardContainer, headerContainer, model }) {
    this.boardContainer = boardContainer;
    this.headerContainer = headerContainer;
    this.model = model;
  }

  init() {
    const points = this.model.getPoints();

    render(this.boardComponent, this.boardContainer);

    /* Header */
    render(new TripInfo(), this.headerContainer, RenderPosition.AFTERBEGIN);
    render(new Filter(), this.headerContainer);

    /* Sort */
    render(new Sort(), this.boardContainer, RenderPosition.AFTERBEGIN);

    /* Edit form */
    if (points.length > 0) {
      const firstPoint = points[0];

      this.renderItem(
        new EditForm({
          ...firstPoint,
          offers: this.model.getOffersWithSelected(firstPoint),
        }),
      );
    }

    /* Create form */
    this.renderItem(new CreateForm());

    /* Points */
    points.forEach((point) => {
      this.renderItem(
        new Point({
          ...point,
          offers: this.model.getOffersWithSelected(point),
        }),
      );
    });
  }

  renderItem(component) {
    const boardItem = new BoardItem();
    render(boardItem, this.boardComponent.getElement());
    render(component, boardItem.getElement());
  }
}
