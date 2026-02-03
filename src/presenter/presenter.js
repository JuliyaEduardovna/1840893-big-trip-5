import Sort from '../view/sort.js';
import Filter from '../view/filter.js';
import EditForm from '../view/form-edit.js';
import Point from '../view/point.js';
import Board from '../view/board.js';
import TripInfo from '../view/trip-info.js';
import BoardItem from '../view/board-item.js';
import { render, RenderPosition, replace } from '../framework/render.js';
import { MESSAGE_FOR_EMPTY_LIST } from '../constants/constants.js';
import Message from '../view/message.js';
import dayjs from 'dayjs';
// import CreateForm from '../view/form-create.js';
export default class Presenter {
  #boardComponent = new Board();
  #boardContainer = null;
  #headerContainer = null;
  #model = null;
  #currentSortType = null;
  #sortComponent = null;
  #currentFilter = null;

  constructor({ boardContainer, headerContainer, model }) {
    this.#boardContainer = boardContainer;
    this.#headerContainer = headerContainer;
    this.#model = model;
    this.#currentSortType = 'Day';
    this.#currentFilter = 'everything';
  }

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
