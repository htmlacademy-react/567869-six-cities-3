import { Offers } from '../types/offer';
import {
  amsterdam,
  paris,
  cologne,
  brussels,
  hamburg,
  dusseldorf,
} from './cities';

const mockOffers: Offers = [
  // =========================
  // AMSTERDAM
  // =========================
  {
    id: 'amsterdam-1',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: amsterdam,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    description: 'Comfortable apartment in Amsterdam.',
    bedrooms: 2,
    goods: ['Heating', 'Wi-Fi', 'Kitchen'],
    host: {
      name: 'Oliver',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/1.jpg',
      isPro: true,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/1.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/2.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/3.jpg',
    ],
    maxAdults: 3,
  },

  {
    id: 'amsterdam-2',
    title: 'Nice apartment near the city center',
    type: 'apartment',
    price: 150,
    city: amsterdam,
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.3,
    description: 'A cozy place close to the center of Amsterdam.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Kitchen', 'Towels'],
    host: {
      name: 'Anna',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/2.jpg',
      isPro: false,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/4.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/5.jpg',
    ],
    maxAdults: 2,
  },

  {
    id: 'amsterdam-3',
    title: 'Canal view house',
    type: 'house',
    price: 210,
    city: amsterdam,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    description: 'Spacious house with a beautiful canal view.',
    bedrooms: 3,
    goods: ['Heating', 'Wi-Fi', 'Kitchen', 'Dishwasher'],
    host: {
      name: 'Daniel',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/3.jpg',
      isPro: true,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/6.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/7.jpg',
    ],
    maxAdults: 5,
  },

  {
    id: 'amsterdam-4',
    title: 'Cozy room in Amsterdam',
    type: 'room',
    price: 80,
    city: amsterdam,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.1,
    description: 'Small but comfortable room for a short stay.',
    bedrooms: 1,
    goods: ['Heating', 'Wi-Fi', 'Coffee Machine'],
    host: {
      name: 'Emma',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/4.jpg',
      isPro: false,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/8.jpg',
    ],
    maxAdults: 2,
  },

  // =========================
  // PARIS
  // =========================
  {
    id: 'paris-1',
    title: 'Apartment near the Seine',
    type: 'apartment',
    price: 180,
    city: paris,
    location: {
      latitude: 48.861,
      longitude: 2.338,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    description: 'Elegant apartment in the center of Paris.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Coffee Machine'],
    host: {
      name: 'Sophie',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/5.jpg',
      isPro: true,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/9.jpg',
      'https://15.design.htmlacademy.pro/static/hotel/10.jpg',
    ],
    maxAdults: 4,
  },

  {
    id: 'paris-2',
    title: 'Small Paris studio',
    type: 'studio',
    price: 110,
    city: paris,
    location: {
      latitude: 48.849,
      longitude: 2.37,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.2,
    description: 'Compact studio for a weekend in Paris.',
    bedrooms: 1,
    goods: ['Heating', 'Wi-Fi', 'Fridge'],
    host: {
      name: 'Lucas',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/6.jpg',
      isPro: false,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/11.jpg',
    ],
    maxAdults: 2,
  },

  // =========================
  // COLOGNE
  // =========================
  {
    id: 'cologne-1',
    title: 'Apartment near Cologne Cathedral',
    type: 'apartment',
    price: 135,
    city: cologne,
    location: {
      latitude: 50.941,
      longitude: 6.958,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    description: 'Modern apartment in central Cologne.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Dishwasher'],
    host: {
      name: 'Felix',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/7.jpg',
      isPro: true,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/12.jpg',
    ],
    maxAdults: 3,
  },

  {
    id: 'cologne-2',
    title: 'Quiet room in Cologne',
    type: 'room',
    price: 75,
    city: cologne,
    location: {
      latitude: 50.93,
      longitude: 6.97,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    description: 'Quiet room not far from the old town.',
    bedrooms: 1,
    goods: ['Heating', 'Wi-Fi', 'Towels'],
    host: {
      name: 'Marie',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/8.jpg',
      isPro: false,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/13.jpg',
    ],
    maxAdults: 2,
  },

  // =========================
  // BRUSSELS
  // =========================
  {
    id: 'brussels-1',
    title: 'Modern Brussels apartment',
    type: 'apartment',
    price: 145,
    city: brussels,
    location: {
      latitude: 50.855,
      longitude: 4.35,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    description: 'Modern apartment near the historical center.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Washing Machine'],
    host: {
      name: 'Thomas',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/9.jpg',
      isPro: true,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/14.jpg',
    ],
    maxAdults: 4,
  },

  {
    id: 'brussels-2',
    title: 'Cozy Brussels house',
    type: 'house',
    price: 195,
    city: brussels,
    location: {
      latitude: 50.84,
      longitude: 4.365,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.4,
    description: 'Comfortable house in a quiet Brussels district.',
    bedrooms: 3,
    goods: ['Heating', 'Kitchen', 'Fridge', 'Dishwasher'],
    host: {
      name: 'Charlotte',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/10.jpg',
      isPro: false,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/15.jpg',
    ],
    maxAdults: 5,
  },

  // =========================
  // HAMBURG
  // =========================
  {
    id: 'hamburg-1',
    title: 'Hamburg harbor apartment',
    type: 'apartment',
    price: 160,
    city: hamburg,
    location: {
      latitude: 53.545,
      longitude: 9.98,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.7,
    description: 'Apartment with easy access to Hamburg harbor.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Coffee Machine'],
    host: {
      name: 'Hans',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/11.jpg',
      isPro: true,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/16.jpg',
    ],
    maxAdults: 4,
  },

  {
    id: 'hamburg-2',
    title: 'Comfortable Hamburg studio',
    type: 'studio',
    price: 105,
    city: hamburg,
    location: {
      latitude: 53.56,
      longitude: 10.01,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.3,
    description: 'Bright studio for a comfortable stay.',
    bedrooms: 1,
    goods: ['Heating', 'Wi-Fi', 'Fridge'],
    host: {
      name: 'Lena',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/12.jpg',
      isPro: false,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/17.jpg',
    ],
    maxAdults: 2,
  },

  // =========================
  // DUSSELDORF
  // =========================
  {
    id: 'dusseldorf-1',
    title: 'Apartment in central Dusseldorf',
    type: 'apartment',
    price: 140,
    city: dusseldorf,
    location: {
      latitude: 51.23,
      longitude: 6.775,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.6,
    description: 'Apartment close to the main attractions.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Kitchen', 'Washing Machine'],
    host: {
      name: 'Max',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/13.jpg',
      isPro: true,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/18.jpg',
    ],
    maxAdults: 3,
  },

  {
    id: 'dusseldorf-2',
    title: 'Quiet house in Dusseldorf',
    type: 'house',
    price: 185,
    city: dusseldorf,
    location: {
      latitude: 51.218,
      longitude: 6.79,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    description: 'Spacious house in a peaceful neighborhood.',
    bedrooms: 3,
    goods: ['Heating', 'Wi-Fi', 'Kitchen', 'Towels'],
    host: {
      name: 'Laura',
      avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/14.jpg',
      isPro: false,
    },
    images: [
      'https://15.design.htmlacademy.pro/static/hotel/19.jpg',
    ],
    maxAdults: 5,
  },
];

export default mockOffers;
