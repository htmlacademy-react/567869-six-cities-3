import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import clsx from 'clsx';
import { fetchOfferAction, fetchReviewsAction, fetchNearbyOffersAction } from '../../store/action';
import { Navigate, useParams } from 'react-router-dom';
import Map from '../../components/map';
import { capitalize, ratingWidthStyle } from '../../utils/tools';
import Review from '../../components/review';
import PlaceCard from '../../components/place-card';
import { AuthorizationStatus } from '../../const';
import ReviewForm from '../../components/review-form';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import Spinner from '../../components/spinner';

function OfferPage(): JSX.Element {

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const currentOffer = useAppSelector((state) => state.offer);
  const currentReviews = useAppSelector((state) => state.reviews);
  const isAuthorized = useAppSelector((state) => state.authorizationStatus === AuthorizationStatus.Auth);
  const isOfferDataLoading = useAppSelector((state) => state.isOfferDataLoading);
  const offerError = useAppSelector((state) => state.offerError);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      const reviewsRequest = dispatch(fetchReviewsAction(id));
      const nearbyOffersRequest = dispatch(fetchNearbyOffersAction(id));

      return () => {
        reviewsRequest.abort();
        nearbyOffersRequest.abort();
      };
    }
  }, [dispatch, id]);

  if (isOfferDataLoading) {
    return <Spinner />;
  }

  if (offerError === 'not-found') {
    return <Navigate to="/404" replace />;
  }

  if (offerError === 'network') {
    return (
      <main className="page__main page__main--offer">
        <p>Не удалось загрузить предложение. Попробуйте обновить страницу.</p>
      </main>
    );
  }

  if (!currentOffer || currentOffer.id !== id) {
    return (
      <main className="page__main page__main--offer">
        <p role="alert">
          Не удалось загрузить предложение. Попробуйте обновить страницу.
        </p>
      </main>
    );
  }

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

  const mapOffers = [currentOffer, ...nearbyOffers];

  const isFavoriteClassName = clsx(
    'offer__bookmark-button',
    'button',
    {
      'offer__bookmark-button--active': isFavorite,
    }
  );

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
                {isAuthorized && <ReviewForm key={currentOffer.id} offerId={currentOffer.id} />}
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
