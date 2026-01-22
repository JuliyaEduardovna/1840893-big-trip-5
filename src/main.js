import Presenter from './presenter/presenter.js';

/* Header */

const siteHeaderElement = document.querySelector('.trip-main');

/* Main page */

const siteMainElement = document.querySelector('.trip-events');

const pagePresenter = new Presenter({ boardContainer: siteMainElement });

pagePresenter.init();

export { siteHeaderElement, siteMainElement };

