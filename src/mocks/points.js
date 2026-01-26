import dayjs from 'dayjs';
import { OFFERS } from './offers.js';
import { DESTINATIONS } from './destinations.js';
import { getRandomInt, getRandomIntInRange } from '../utils/utils.js';
import { MIN_PRICE, MAX_PRICE, POINTS_COUNT } from '../constants/constants.js';

const EVENT_TYPES = OFFERS.map((group) => group.type);

function generateOffersForPointType(pointType) {
  const offerGroup = OFFERS.find((group) => group.type === pointType);
  if (!offerGroup || offerGroup.offers.length === 0) {
    return [];
  }

  const count = getRandomIntInRange(0, offerGroup.offers.length);

  const shuffled = [...offerGroup.offers].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}

function generatePoint() {
  const type = EVENT_TYPES[getRandomInt(EVENT_TYPES.length)];

  const destination = DESTINATIONS[getRandomInt(DESTINATIONS.length)];

  const dateFrom = dayjs()
    .add(getRandomIntInRange(0, 30), 'day')
    .add(getRandomIntInRange(0, 23), 'hour');
  const dateTo = dateFrom.add(getRandomIntInRange(1, 48), 'hour');

  return {
    id: crypto.randomUUID(),
    basePrice: getRandomIntInRange(MIN_PRICE, MAX_PRICE),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    destination,
    isFavorite: Math.random() < 0.5,
    type,
    offers: generateOffersForPointType(type),
  };
}

const POINTS = Array.from({ length: POINTS_COUNT }, generatePoint);

export { POINTS };
