import { SortType } from '../const';
import { Offer } from '../types/offer';

export const getSortedOffers = (offers: Offer[], sortType: SortType) => {
  const sortedOffers = [...offers];

  switch (sortType) {
    case SortType.PriceLowToHigh:
      return sortedOffers.sort((a, b) => a.price - b.price);
    case SortType.PriceHighToLow:
      return sortedOffers.sort((a, b) => b.price - a.price);
    case SortType.TopRatedFirst:
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    default:
      return sortedOffers;
  }
};
