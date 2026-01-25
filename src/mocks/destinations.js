import { getRandomInt } from '../utils/utils.js';

const cities = [
  'Munich',
  'Rome',
  'Paris',
  'Tokyo',
  'Valencia',
  'Sochi',
  'Moscow',
  'Monaco',
  'Frankfurt',
];

const loremSentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const existingIds = [
  '1715f7a0-e610-4919-830d-efbe39962c20',
  'c16aa5dc-05fa-4d8e-bc84-dbeade2355b8',
  '04aa260b-0ce5-4dab-a733-863e69d0003f',
  '0d30a03d-9c24-4426-9ffa-f8dbe5f10b0d',
  '254f154f-f451-4c5d-a850-3a2302adfe61',
  'de165f8c-46ef-4614-b6ba-56f30e4a08b4',
  'fb067eb3-0831-44cc-8820-066345a6c539',
  '03dbffb3-51cb-481c-8183-67aa61808be0',
];

function generateDestination(existingId) {
  const city = cities[getRandomInt(cities.length)];
  const description = Array.from(
    { length: getRandomInt(5) + 1 },
    () => loremSentences[getRandomInt(loremSentences.length)],
  ).join(' ');

  const pictures = Array.from(
    { length: getRandomInt(3) + 1 },
    () => `https://loremflickr.com/248/152?random=${getRandomInt(1000)}`,
  );

  return {
    id: existingId,
    name: city,
    description,
    pictures,
  };
}

const DESTINATIONS = Array.from({ length: existingIds.length }, (_, i) =>
  generateDestination(existingIds[i]),
);

export { DESTINATIONS };
