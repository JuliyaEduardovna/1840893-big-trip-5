import { DESTINATIONS } from './destinations.js';
import { OFFERS } from './offers.js';
import { getRandomInt } from '../utils/utils.js';

function randomDate(from, to) {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime()),
  );
}

function randomOffers(pointType) {
  if (pointType === 'sightseeing') {
    return [];
  }
  const offersForType = OFFERS.find((o) => o.type === pointType)?.offers || [];
  const count = getRandomInt(offersForType.length + 1);
  const shuffled = offersForType.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((offer) => offer.id);
}

function generatePoint(existingPoint) {
  const basePrice = getRandomInt(10000) + 100;
  const dateFrom = randomDate(new Date(2026, 0, 1), new Date(2026, 2, 31));
  const dateTo = new Date(
    dateFrom.getTime() + (getRandomInt(72) + 1) * 3600000,
  );
  const destination = DESTINATIONS[getRandomInt(DESTINATIONS.length)].id;
  const offers = randomOffers(existingPoint.type);
  const isFavorite = Math.random() < 0.5;

  return {
    id: existingPoint.id,
    basePrice,
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    destination,
    isFavorite,
    offers,
    type: existingPoint.type,
  };
}

const existingPoints = [
  { id: 'afc0ff04-9e3d-4338-84bb-3899aa89bb99', type: 'sightseeing' },
  { id: 'da5dfc4e-6fd3-4bc0-a70f-305c6e9c95d8', type: 'taxi' },
  { id: 'a34e1366-09ff-4d9f-96eb-87915edf0cf8', type: 'bus' },
  { id: 'dc6964f5-da87-4245-aea1-88480ca40353', type: 'drive' },
  { id: '692f1d45-02d2-4bbf-a3db-a1938a55dfd5', type: 'sightseeing' },
  { id: 'bd0cf962-f719-47b6-a720-660376b8d2dc', type: 'train' },
  { id: '2e35fb77-9b1b-4344-a045-f714f2365b38', type: 'restaurant' },
  { id: '96c6c3b3-7afc-4460-9550-08c4334a72a9', type: 'train' },
  { id: '575bd6c8-fb25-42c3-9ed6-14baeb44db8a', type: 'check-in' },
  { id: 'f0bdd565-d82b-4d8f-a1a9-edd2e386d5be', type: 'train' },
  { id: '1f29ff48-436b-4a59-9c77-43c229bee9a5', type: 'sightseeing' },
  { id: '58214ac5-c9ed-468b-a435-d112e8edaaef', type: 'drive' },
  { id: '19bc2b4b-f377-4491-9d33-4bdc402d8a26', type: 'ship' },
  { id: 'e16c2940-13ec-4a07-9f5b-8b2267537eab', type: 'train' },
  { id: '7c4ff532-1dcf-49d4-8575-3fa77a6c4bb2', type: 'ship' },
  { id: '4b5fa95f-31b7-4754-addb-4d94203158a4', type: 'check-in' },
  { id: '4955800b-d1ca-449f-bba6-3e79b0da1f77', type: 'restaurant' },
  { id: 'fcab7ba7-683f-4b17-8381-21c6394962e6', type: 'train' },
  { id: '80b2f1ac-08a8-47de-89ae-1f08d589a146', type: 'taxi' },
  { id: '3f8e6579-9355-4a2c-8127-0432b9bdca8e', type: 'flight' },
  { id: '3dddc755-8cd0-4b68-bd00-f2ea34ec7d3a', type: 'restaurant' },
  { id: '9be20c98-63cf-483a-a650-6699618d7880', type: 'sightseeing' },
  { id: '2d3ae17b-ca93-4cdf-b73a-79b659db0387', type: 'check-in' },
  { id: '17f5b28a-784a-4428-ad7b-991d147d09f9', type: 'check-in' },
  { id: '0041c810-b1ed-44cb-9dbf-956c1d252365', type: 'sightseeing' },
];

const POINTS = existingPoints.map(generatePoint);

export { POINTS };
