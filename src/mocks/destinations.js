import { getRandomIntInRange, getRandomInt } from '../utils/utils.js';
import {
  CITIES,
  DESCRIPTION,
  MAX_COUNT_FOR_RANDOM,
  MAX_COUNT_DESCRIPTION,
} from '../constants/constants.js';

function generatePicture() {
  return {
    src: `https://loremflickr.com/248/152?random=${getRandomInt(MAX_COUNT_FOR_RANDOM)}`,
    description: Array.from(
      { length: getRandomInt(MAX_COUNT_FOR_RANDOM) + 1 },
      () => DESCRIPTION[getRandomInt(DESCRIPTION.length)],
    ).join(' '),
  };
}

function generateDestination() {
  const city = CITIES[getRandomInt(CITIES.length)];
  const description = Array.from(
    { length: getRandomInt(MAX_COUNT_FOR_RANDOM) + 1 },
    () => DESCRIPTION[getRandomInt(DESCRIPTION.length)],
  ).join(' ');

  const pictures = Array.from(
    { length: getRandomIntInRange(0, MAX_COUNT_FOR_RANDOM) + 1 },
    generatePicture,
  );

  return {
    id: crypto.randomUUID(),
    name: city,
    description,
    pictures,
  };
}

const DESTINATIONS = Array.from({ length: MAX_COUNT_DESCRIPTION }, () =>
  generateDestination(),
);

export { DESTINATIONS };
