import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  fillOffer,
  fillOffers,
  fetchReviewsAction,
  setOfferError,
  setOfferDataLoadingStatus,
  setOffersDataLoadingStatus,
  requireAuthorization,
  setUser,
  postReviewAction,
  fetchNearbyOffersAction,
  fetchFavoritesAction,
  changeFavoriteStatusAction,
} from './action';
import type { Offer, FullOffer } from '../types/offer';
import type { Reviews } from '../types/review';
import { AuthorizationStatus } from '../const';
import type { UserData } from '../types/user-data';

const initialState: {
  city: string;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  offers: Offer[];
  favorites: Offer[];
  favoritesStatus: 'loading' | 'success';
  offer: FullOffer | null;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  offerError: 'not-found' | 'network' | null;
  reviews: Reviews;
  nearbyOffers: Offer[];
} = {
  city: 'Paris',
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  offers: [],
  favorites: [],
  favoritesStatus: 'loading',
  offer: null,
  isOffersDataLoading: true,
  isOfferDataLoading: false,
  offerError: null,
  reviews: [],
  nearbyOffers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.favoritesStatus = 'success';
    })
    .addCase(fetchFavoritesAction.pending, (state) => {
      state.favoritesStatus = 'loading';
    })
    .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
      const updatedOffer = action.payload;
      const { id, isFavorite } = updatedOffer;

      const catalogOffer = state.offers.find((offer) => offer.id === id);
      if (catalogOffer) {
        catalogOffer.isFavorite = isFavorite;
      }

      const nearbyOffer = state.nearbyOffers.find((offer) => offer.id === id);
      if (nearbyOffer) {
        nearbyOffer.isFavorite = isFavorite;
      }

      if (state.offer?.id === id) {
        state.offer.isFavorite = isFavorite;
      }

      state.favorites = state.favorites.filter((offer) => offer.id !== id);
      if (isFavorite) {
        state.favorites.push(updatedOffer);
      }
    })
    .addCase(fillOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fetchReviewsAction.pending, (state) => {
      state.reviews = [];
    })
    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(fetchNearbyOffersAction.pending, (state) => {
      state.nearbyOffers = [];
    })
    .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload.slice(0, 3);
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      if (state.offer?.id === action.meta.arg.offerId) {
        state.reviews.unshift(action.payload);
      }
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setOfferError, (state, action) => {
      state.offerError = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;

      if (action.payload === AuthorizationStatus.NoAuth) {
        state.favorites = [];
        state.favoritesStatus = 'loading';
      }
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
