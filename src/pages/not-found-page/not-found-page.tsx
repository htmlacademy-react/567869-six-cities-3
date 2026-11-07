import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';

function NotFoundPage() {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities: 404 error</title>
      </Helmet>
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Page is not found</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">404 Not Found</b>
                <Link className="button form__submit" to={AppRoute.Root}>
                  Do you want to go back?{' '}
                </Link>
              </div>
            </section>
            <section className="cities__right-section"></section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
