import MainPresenter from './presenter/main-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

/* Header */
const siteHeaderElement = document.querySelector('.trip-main');

/* Main page */
const siteMainElement = document.querySelector('.trip-events');

const filterPresenter = new FilterPresenter({
  headerContainer: siteHeaderElement,
  pointsModel,
  filterModel,
});

filterPresenter.init();

const mainPresenter = new MainPresenter({
  boardContainer: siteMainElement,
  headerContainer: siteHeaderElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});

mainPresenter.init();
