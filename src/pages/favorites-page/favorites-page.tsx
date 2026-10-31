import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { fetchOffersAction } from '../../store/action';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>6 cities: favorites</title>
      </Helmet>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <FavoritesList offers={favoriteOffers} />
          </section>
        </div>
      </main>
    </>
  );
}

export default FavoritesPage;
