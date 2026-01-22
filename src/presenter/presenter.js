import { render, RenderPosition } from '../render.js';
import Sort from '../view/sort.js';
import Filter from '../view/filter.js';
import CreateForm from '../view/form-create.js';
import EditForm from '../view/form-edit.js';
import Point from '../view/point.js';
import Board from '../view/board.js';
import { siteHeaderElement, siteMainElement } from '../main.js';
import TripInfo from '../view/trip-info.js';
import BoardItem from '../view/board-item.js';

export default class Presenter {
  boardComponent = new Board();

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);

    /* Header */

    render(new TripInfo(), siteHeaderElement, RenderPosition.AFTERBEGIN);
    render(new Filter(), siteHeaderElement);

    /* Main page */

    render(new Sort(), siteMainElement, RenderPosition.AFTERBEGIN);

    this.renderItem(new EditForm());
    this.renderItem(new CreateForm());

    for (let i = 0; i < 3; i++) {
      this.renderItem(new Point());
    }
  }

  renderItem(content) {
    const boardItem = new BoardItem();
    render(boardItem, this.boardComponent.getElement());
    render(content, boardItem.getElement());
  }
}
