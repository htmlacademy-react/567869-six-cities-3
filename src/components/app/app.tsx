import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page';
import LoginPage from '../../pages/login-page';
import FavoritesPage from '../../pages/favorites-page';
import OfferPage from '../../pages/offer-page';
import NotFoundPage from '../../pages/not-found-page';
import PrivateRoute from '../private-route';
import Layout from '../layout';
import { City } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { checkAuthAction, fetchFavoritesAction } from '../../store/action';


type AppProps = {
  cities: City[];
};

function App({ cities }: AppProps): JSX.Element {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      const request = dispatch(fetchFavoritesAction());

      return () => {
        request.abort();
      };
    }
  }, [authorizationStatus, dispatch]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.Root} element={<Layout />}>
            <Route index element={<MainPage cities={cities} />} />
            <Route
              path={AppRoute.Login}
              element={
                <PrivateRoute isReverse>
                  <LoginPage />
                </PrivateRoute>
              }
            />
            <Route
              path={AppRoute.Favorites}
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path={`${AppRoute.Offer}/:id`}
              element={<OfferPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
