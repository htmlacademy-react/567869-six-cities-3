import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { Helmet } from 'react-helmet-async';

function NotFoundPage() {
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities: 404 error</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index page__main--index-empty">
        <h1 className="visually-hidden">Page is not found</h1>
        <div className="cities">
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">Page is not found</b>
                <Link className='button form__submit' to={AppRoute.Main}>Do you want to go back? </Link>
              </div>
            </section>
            <section className="cities__right-section">

            </section>
          </div>
        </div>
      </main>
    </div >
  );
}

export default NotFoundPage;
