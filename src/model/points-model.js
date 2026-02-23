import Observable from '../framework/observable.js';
import { POINTS } from '../mocks/points.js';
import { UPDATE_TYPE } from '../constants/constants.js';

export default class PointsModel extends Observable {
  #points = POINTS;

  get points() {
    return this.#points;
  }

  set points(points) {
    this.#points = points;
    this._notify(UPDATE_TYPE.MAJOR);
  }

  updatePoint(updatedPoint) {
    this.#points = this.#points.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point,
    );
    this._notify(UPDATE_TYPE.PATCH, updatedPoint);
  }

  deletePoint(deletedPoint) {
    const filteredPoints = this.#points.filter(
      (point) => point.id !== deletedPoint.id,
    );

    if (filteredPoints.length !== this.#points.length) {
      this.#points = filteredPoints;
      this._notify(UPDATE_TYPE.MINOR, deletedPoint);
    }
  }

  addPoint(newPoint) {
    this.#points = [newPoint, ...this.#points];
    this._notify(UPDATE_TYPE.MAJOR, newPoint);
  }
}
