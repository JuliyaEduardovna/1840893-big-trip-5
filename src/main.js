import MainPresenter from './presenter/main-presenter.js';
import Model from './model/model.js';

const model = new Model();

/* Header */

const siteHeaderElement = document.querySelector('.trip-main');

/* Main page */

const siteMainElement = document.querySelector('.trip-events');

const pagePresenter = new MainPresenter({
  boardContainer: siteMainElement,
  headerContainer: siteHeaderElement,
  model,
});

pagePresenter.init();
