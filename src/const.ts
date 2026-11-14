export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export enum APIRoute {
  Offers = '/offers',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
}

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;
export const MAX_REVIEWS_COUNT = 10;
export const MAX_NEARBY_OFFERS_COUNT = 3;
export const MAX_RATING = 5;

