import ApiClient from './api/api-client.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import { adaptPoint, adaptDestination, adaptOffers } from './api/adapter.js';
import Message from './view/message.js';
import { render } from './framework/render.js';
import { AUTHORIZATION, END_POINT, FAILED_LOAD_MESSAGE, LOADING_MESSAGE } from './constants/constants.js';

const apiClient = new ApiClient(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

/* Header */
const siteHeaderElement = document.querySelector('.trip-main');

/* Main page */
const siteMainElement = document.querySelector('.trip-events');

const loadingMessage = new Message({ message: LOADING_MESSAGE });
render(loadingMessage, siteMainElement);

const filterPresenter = new FilterPresenter({
  headerContainer: siteHeaderElement,
  pointsModel,
  filterModel,
});

const mainPresenter = new MainPresenter({
  boardContainer: siteMainElement,
  headerContainer: siteHeaderElement,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});

async function loadData() {
  try {
    const [points, destinations, offers] = await Promise.all([
      apiClient.getPoints(),
      apiClient.getDestinations(),
      apiClient.getOffers(),
    ]);

    destinationsModel.destinations = destinations.map(adaptDestination);

    pointsModel.points = points.map((point) => ({
      ...adaptPoint(point),
      destination: destinationsModel.destinations.find(
        (dest) => dest.id === point.destination
      )
    }));

    offersModel.offers = adaptOffers(offers);

    filterPresenter.init();
    mainPresenter.init();
  } catch (error) {
    loadingMessage.element.remove();
    const errorMessage = new Message({
      message: FAILED_LOAD_MESSAGE,
    });
    render(errorMessage, siteMainElement);
  }
}

loadData();
