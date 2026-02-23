import dayjs from 'dayjs';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDuration(dateFrom, dateTo) {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');

  const days = Math.floor(diff / 1440);
  const hours = Math.floor((diff % 1440) / 60);
  const minutes = diff % 60;

  if (days > 0) {
    return `${days}D ${hours}H ${minutes}M`;
  }

  if (hours > 0) {
    return `${hours}H ${minutes}M`;
  }

  return `${minutes}M`;
}

export function getInitialPointState(point = {}) {
  return {
    type: point.type || 'taxi',
    destination: point.destination || {
      id: '',
      name: '',
      description: '',
      pictures: []
    },
    basePrice: point.basePrice || 0,
    dateFrom: point.dateFrom || dayjs().toISOString(),
    dateTo: point.dateTo || dayjs().add(1, 'hour').toISOString(),
    offers: point.offers || []
  };
}

export { getRandomInt, getRandomIntInRange, formatDuration };
