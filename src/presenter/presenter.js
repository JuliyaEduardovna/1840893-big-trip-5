import { render, RenderPosition } from '../render.js';
import Sort from '../view/sort.js';
import Filter from '../view/filter.js';
import CreateForm from '../view/form-create.js';
import EditForm from '../view/form-edit.js';
import Point from '../view/point.js';
import Board from '../view/board.js';
import TripInfo from '../view/trip-info.js';
import BoardItem from '../view/board-item.js';
import { generatePoints } from '../mocks/mock-generator.js';
import { getRandomIntInRange } from '../utils/utils.js';

export default class Presenter {
  boardComponent = new Board();

  constructor({ boardContainer, headerContainer }) {
    this.boardContainer = boardContainer;
    this.headerContainer = headerContainer;
  }

  init() {
    render(this.boardComponent, this.boardContainer);

    /* Header */
    render(new TripInfo(), this.headerContainer, RenderPosition.AFTERBEGIN);
    render(new Filter(), this.headerContainer);

    /* Main page */
    render(new Sort(), this.boardContainer, RenderPosition.AFTERBEGIN);

    /* Generate all points */
    const pointsWithData = generatePoints();

    /* Generate an editing form */
    const editPoint =
      pointsWithData[getRandomIntInRange(0, pointsWithData.length - 1)];
    this.renderItem(new EditForm(editPoint));

    /* Generate a creation form */
    this.renderItem(new CreateForm());

    /* Render first 3 points  */
    pointsWithData.slice(0, 3).forEach((pointData) => {
      this.renderItem(new Point(pointData));
    });
  }

  renderItem(component) {
    const boardItem = new BoardItem();
    render(boardItem, this.boardComponent.getElement());
    render(component, boardItem.getElement());
  }
}
