import { City } from '../types/offer';

export const paris: City = {
  name: 'Paris',
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 12,
  },
};

export const cologne: City = {
  name: 'Cologne',
  location: {
    latitude: 50.9375,
    longitude: 6.9603,
    zoom: 12,
  },
};

export const brussels: City = {
  name: 'Brussels',
  location: {
    latitude: 50.8503,
    longitude: 4.3517,
    zoom: 12,
  },
};

export const amsterdam: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.38333,
    longitude: 4.9,
    zoom: 12,
  },
};

export const hamburg: City = {
  name: 'Hamburg',
  location: {
    latitude: 53.5511,
    longitude: 9.9937,
    zoom: 12,
  },
};

export const dusseldorf: City = {
  name: 'Dusseldorf',
  location: {
    latitude: 51.2277,
    longitude: 6.7735,
    zoom: 12,
  },
};

export const cities: City[] = [
  paris,
  cologne,
  brussels,
  amsterdam,
  hamburg,
  dusseldorf,
];
