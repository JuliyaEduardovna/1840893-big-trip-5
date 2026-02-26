
export function adaptPoint(point) {
  return {
    id: point.id,
    basePrice: point['base_price'],
    dateFrom: point['date_from'],
    dateTo: point['date_to'],
    destination: point.destination,
    isFavorite: point['is_favorite'],
    type: point.type,
    offers: point.offers || []
  };
}

export function adaptDestination(destination) {
  return {
    id: destination.id,
    name: destination.name,
    description: destination.description,
    pictures: destination.pictures || []
  };
}

export function adaptOffers(offers) {
  return offers.map((offerGroup) => ({
    type: offerGroup.type,
    offers: offerGroup.offers.map((offer) => ({
      id: offer.id,
      title: offer.title,
      price: offer.price
    }))
  }));
}
