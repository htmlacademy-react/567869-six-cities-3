import { createReducer } from '@reduxjs/toolkit';
import { changeCity, fillOffer, fillOffers, fetchReviewsAction, setOfferError, setOfferDataLoadingStatus, setOffersDataLoadingStatus, requireAuthorization, setUser, postReviewAction, fetchNearbyOffersAction } from './action';
import type { Offer, FullOffer } from '../types/offer';
import type { Reviews } from '../types/review';
import { AuthorizationStatus } from '../const';
import type { UserData } from '../types/user-data';

const initialState: {
  city: string;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
  offers: Offer[];
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
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
