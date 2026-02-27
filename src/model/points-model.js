import Observable from '../framework/observable';
import { UPDATE_TYPE } from '../constants/constants.js';

export default class PointsModel extends Observable {
  #points = [];
  #offers;
  #destinations;
  #pointsApiService = null;

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const [points, destinations, offers] = await Promise.all([
        this.#pointsApiService.points,
        this.#pointsApiService.destinations,
        this.#pointsApiService.offers,
      ]);

      this.#points = points;
      this.#destinations = destinations;
      this.#offers = offers;
    } catch {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }

    this._notify(UPDATE_TYPE.INIT);
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Point not found');
    }

    try {
      const updatedPoint = await this.#pointsApiService.updatePoint(update);
      this.#points[index] = updatedPoint;
      this._notify(updateType, updatedPoint);
    } catch (err) {
      throw new Error('Can\'t update point');
    }
  }

  addPoint(updateType, point) {
    this.#points = [point, ...this.#points];
    this._notify(updateType, point);
  }

  deletePoint(updateType, point) {
    const index = this.#points.findIndex((p) => p.id === point.id);

    if (index === -1) {
      throw new Error('Point not found');
    }

    this.#points.splice(index, 1);
    this._notify(updateType, point);
  }
}
