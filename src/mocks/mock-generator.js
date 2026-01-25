import { DESTINATIONS } from './destinations.js';
import { OFFERS } from './offers.js';
import { POINTS } from './points.js';

const getDestinationById = (id) => DESTINATIONS.find((destination) => destination.id === id);

const getOffersByType = (type) => {
  const offerGroup = OFFERS.find((offer) => offer.type === type);
  return offerGroup ? offerGroup.offers : [];
};

const getOffersByIds = (type, offerIds) => {
  const offersByType = getOffersByType(type);
  if (!offersByType.length || !offerIds.length) {
    return [];
  }

  return offersByType.filter((offer) => offerIds.includes(offer.id));
};

const generatePoint = (pointData) => {
  const destination = getDestinationById(pointData.destination);
  const allOffersForType = getOffersByType(pointData.type);
  const selectedOffers = getOffersByIds(pointData.type, pointData.offers);

  return {
    id: pointData.id,
    basePrice: pointData.basePrice,
    dateFrom: pointData.dateFrom,
    dateTo: pointData.dateTo,
    isFavorite: pointData.isFavorite,
    type: pointData.type,
    destination: destination || {
      id: 'unknown',
      name: 'Unknown City',
      description: 'No description available',
      pictures: [],
    },
    offers: selectedOffers,
    allOffers: allOffersForType,
  };
};

const generatePoints = () => POINTS.map(generatePoint);

export { generatePoints };
