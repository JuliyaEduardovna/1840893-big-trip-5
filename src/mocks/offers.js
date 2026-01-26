import { getRandomIntInRange } from '../utils/utils.js';
import {
  OFFERS_TEMPLATES,
  MIN_PRICE,
  MAX_PRICE,
} from '../constants/constants.js';

function generateOffer(title) {
  return {
    id: crypto.randomUUID(),
    title,
    price: getRandomIntInRange(MIN_PRICE, MAX_PRICE),
  };
}

function generateOffersForType(type) {
  const titles = OFFERS_TEMPLATES[type] || [];
  const offers = titles.map(generateOffer);
  return { type, offers };
}

const OFFERS = Object.keys(OFFERS_TEMPLATES).map(generateOffersForType);

export { OFFERS };
