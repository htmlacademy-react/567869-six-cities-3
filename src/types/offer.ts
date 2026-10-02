type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

type OfferType = 'apartment' | 'house' | 'room' | 'hotel' | 'cabin' | 'studio';

type Goods =
  | 'Heating'
  | 'Wi-Fi'
  | 'Kitchen'
  | 'Fridge'
  | 'Washing Machine'
  | 'Coffee Machine'
  | 'Dishwasher'
  | 'Towels'
  | 'Baby seat'
  | 'Cabel TV';

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Offer = {
  id: string;
  title: string;
  type: OfferType;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: Goods[];
  host: Host;
  images: string[];
  maxAdults: number;
};

export type Offers = Offer[];
