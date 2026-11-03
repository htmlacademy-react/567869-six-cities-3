import { Helmet } from 'react-helmet-async';
import FavoritesList from '../../components/favorites-list';
import { useAppSelector } from '../../hooks/use-redux';
import Spinner from '../../components/spinner';
import FavoritesEmpty from '../../components/favorites-empty';

function FavoritesPage(): JSX.Element {
  const favoriteOffers = useAppSelector((state) => state.favorites);
  const favoritesStatus = useAppSelector((state) => state.favoritesStatus);

  if (favoritesStatus === 'loading') {
    return <Spinner />;
  }

  if (favoritesStatus === 'success' && favoriteOffers.length === 0) {
    return <FavoritesEmpty />;
  }

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
