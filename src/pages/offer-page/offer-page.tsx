import { Helmet } from 'react-helmet-async';
import clsx from 'clsx';
import { Offer } from '../../types/offer';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page';
import Map from '../../components/map';
import { capitalize, ratingWidthStyle } from '../../utils/tools';
import Review from '../../components/review';
import { Reviews } from '../../types/review';
import PlaceCard from '../../components/place-card';
import { getAuthorizationStatus } from '../../authorization-status';
import { AuthorizationStatus } from '../../const';
import ReviewForm from '../../components/review-form';
import { useAppSelector } from '../../hooks/use-redux';

type OfferPageProps = {
  reviews: Reviews;
};

function OfferPage({ reviews }: OfferPageProps): JSX.Element {
  const offers = useAppSelector((state) => state.offers);

  const { id } = useParams();
  const currentOffer: Offer | undefined = offers.find(
    (offer: Offer) => offer.id === id
  );

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const currentReviews = reviews.filter((review) => review.offerId === currentOffer.id);

  const {
    title,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    maxAdults,
    bedrooms,
    price,
    goods,
    host,
    description,
  } = currentOffer;

  const nearbyOffers = offers
    .filter((offer) =>
      offer.city.name === currentOffer.city.name &&
      offer.id !== currentOffer.id
    )
    .slice(0, 3);

  const mapOffers = [currentOffer, ...nearbyOffers];

  const isFavoriteClassName = clsx(
    'offer__bookmark-button',
    'button',
    {
      'offer__bookmark-button--active': isFavorite,
    }
  );

  const isAuthorized = getAuthorizationStatus() === AuthorizationStatus.Auth;

  return (
    <>
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <main className="page__main page__main--offer">
        <section className="offer">
          {images.length > 0 ? (
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.map((src, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="offer__image-wrapper" key={index}>
                    <img
                      className="offer__image"
                      src={src}
                      alt="Photo studio"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ? (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              ) : null}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <button className={isFavoriteClassName} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: ratingWidthStyle(rating) }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalize(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((god, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li className="offer__inside-item" key={index}>
                      {god}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={
                      host.isPro
                        ? 'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper'
                        : 'offer__avatar-wrapper user__avatar-wrapper'
                    }
                  >
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{host.name}</span>
                  {host.isPro ? (
                    <span className="offer__user-status">Pro</span>
                  ) : null}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">{currentReviews.length}</span>
                </h2>
                <Review reviews={currentReviews} />
                {isAuthorized && <ReviewForm />}
              </section>
            </div>
          </div>

          <Map city={currentOffer.city} offers={mapOffers} className={'offer__map map'} selectedOffer={currentOffer} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer) => (
                <PlaceCard
                  key={offer.id}
                  offer={offer}
                  className="near-places"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default OfferPage;
