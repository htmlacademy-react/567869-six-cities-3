import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, isAxiosError } from 'axios';
import type { Offer, FullOffer } from '../types/offer';
import type { PostReviewData, Review, Reviews } from '../types/review';
import { AppDispatch, State } from '../types/store';
import { APIRoute, AuthorizationStatus } from '../const';
import type { AuthData } from '../types/auth-data';
import type { UserData } from '../types/user-data';
import { saveToken, dropToken } from '../services/token';

export const changeCity = createAction<string>('city/changeCity');
export const fillOffers = createAction<Offer[]>('offers/fillOffers');
export const fillOffer = createAction<FullOffer | null>('offer/fillOffer');
export const setOffersDataLoadingStatus = createAction<boolean>(
  'offers/setOffersDataLoadingStatus'
);

export const setOfferDataLoadingStatus = createAction<boolean>(
  'offer/setOfferDataLoadingStatus'
);

export const setOfferError = createAction<'not-found' | 'network' | null>(
  'offer/setOfferError'
);

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUser = createAction<UserData | null>('user/setUser');

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(fillOffers(data));
    dispatch(setOffersDataLoadingStatus(false));
  }
);

export const fetchOfferAction = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffer',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setOfferDataLoadingStatus(true));
    dispatch(setOfferError(null));
    dispatch(fillOffer(null));

    try {
      const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
      dispatch(fillOffer(data));
    } catch (error) {
      const isNotFound =
        isAxiosError(error) && error.response?.status === 404;

      dispatch(setOfferError(isNotFound ? 'not-found' : 'network'));

      throw error;
    } finally {
      dispatch(setOfferDataLoadingStatus(false));
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<
  Reviews,
  string,
  { extra: AxiosInstance }
>(
  'reviews/fetchReviews',
  async (offerId, { extra: api, signal }) => {
    const { data } = await api.get<Reviews>(
      `${APIRoute.Comments}/${offerId}`,
      { signal }
    );

    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<
  Offer[],
  string,
  { extra: AxiosInstance }
>(
  'offers/fetchNearbyOffers',
  async (offerId, { extra: api, signal }) => {
    const { data } = await api.get<Offer[]>(
      `${APIRoute.Offers}/${offerId}/nearby`,
      { signal }
    );

    return data;
  }
);

export const postReviewAction = createAsyncThunk<
  Review,
  PostReviewData,
  { extra: AxiosInstance }
>(
  'reviews/postReview',
  async ({offerId, comment, rating}, { extra: api }) => {
    const { data } = await api.post<Review>(
      `${APIRoute.Comments}/${offerId}`,
      { comment, rating }
    );

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      dispatch(setUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        dispatch(setUser(null));
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        return;
      }

      throw error;
    }
  }
);

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login',
  async (authData, { dispatch, extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, authData);

    saveToken(data.token);
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);

    dropToken();
    dispatch(setUser(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);
