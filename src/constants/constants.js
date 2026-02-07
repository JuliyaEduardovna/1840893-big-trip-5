const SORT_TYPE = ['Day', 'Event', 'Time', 'Price', 'Offer'];

const FILTER_TYPE = ['Everything', 'Future', 'Present', 'Past'];

const TRANSPORT_TYPE = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

const CITIES = [
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

const DESCRIPTION = [
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

const MAX_COUNT_FOR_RANDOM = 3;

const MAX_COUNT_DESCRIPTION = 5;


const OFFERS_TEMPLATES = {
  taxi: [
    'Upgrade to a business class',
    'Choose the radio station',
    'Choose temperature',
    'Drive quickly, I\'m in a hurry',
    'Drive slowly',
  ],
  bus: [
    'Infotainment system',
    'Order meal',
    'Choose seats',
  ],
  train: [
    'Book a taxi at the arrival point',
    'Order a breakfast',
    'Wake up at a certain time',
  ],
  flight: [
    'Choose meal',
    'Choose seats',
    'Upgrade to comfort class',
    'Upgrade to business class',
    'Add luggage',
    'Business lounge',
  ],
  'check-in': [
    'Choose the time of check-in',
    'Choose the time of check-out',
    'Add breakfast',
    'Laundry',
    'Order a meal from the restaurant',
  ],
  sightseeing: [],
  ship: [
    'Choose meal',
    'Choose seats',
    'Upgrade to comfort class',
    'Upgrade to business class',
    'Add luggage',
    'Business lounge',
  ],
  drive: [
    'With automatic transmission',
    'With air conditioning',
  ],
  restaurant: [
    'Choose live music',
    'Choose VIP area',
  ],
};

const MIN_PRICE = 30;

const MAX_PRICE = 1000;

const POINTS_COUNT = 3;

const MESSAGE_FOR_EMPTY_LIST = 'Click New Event to create your first point';

export {
  SORT_TYPE,
  FILTER_TYPE,
  TRANSPORT_TYPE,
  CITIES,
  DESCRIPTION,
  MAX_COUNT_FOR_RANDOM,
  MAX_COUNT_DESCRIPTION,
  OFFERS_TEMPLATES,
  MIN_PRICE,
  MAX_PRICE,
  POINTS_COUNT,
  MESSAGE_FOR_EMPTY_LIST,
};

