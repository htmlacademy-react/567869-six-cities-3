import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { Offer } from '../../types/offer';
import { capitalize, ratingWidthStyle } from '../../utils/tools';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { changeFavoriteStatusAction } from '../../store/action';


type PlaceCardProps = {
  offer: Offer;
  handleHover?: (offer?: Offer) => void;
  className?: 'cities' | 'near-places';
};

function PlaceCard({ offer, handleHover, className = 'cities' }: PlaceCardProps): JSX.Element {
  const handleMouseOn = () => {
    handleHover?.(offer);
  };

  const handleMouseOff = () => {
    handleHover?.();
  };

  const {
    id,
    isPremium,
    isFavorite,
    previewImage,
    title,
    price,
    rating,
    type
  } = offer;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleFavoriteClick = async () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    if (isUpdating) {
      return;
    }
    setIsUpdating(true);
    try {
      await dispatch(changeFavoriteStatusAction({
        offerId: id,
        isFavorite: !isFavorite,
      }));
    } finally {
      setIsUpdating(false);
    }
  };

  const isFavoriteClassName = clsx(
    'place-card__bookmark-button',
    'button',
    {
      'place-card__bookmark-button--active': isFavorite,
    }
  );

  const isNearPlaces = className === 'near-places';

  const cardClassName = clsx(
    'place-card',
    {
      'near-places__card place-card': isNearPlaces,
      'cities__card place-card': !isNearPlaces,
    }
  );

  const imageWrapperClassName = clsx(
    'place-card__image-wrapper',
    {
      'near-places__image-wrapper': isNearPlaces,
      'cities__image-wrapper': !isNearPlaces,
    }
  );

  return (
    <article
      className={cardClassName}
      onMouseEnter={handleMouseOn}
      onMouseLeave={handleMouseOff}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={imageWrapperClassName}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt={title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={isFavoriteClassName}
            type="button"
            aria-pressed={isFavorite}
            disabled={isUpdating || authorizationStatus === AuthorizationStatus.Unknown}
            onClick={() => void handleFavoriteClick()}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidthStyle(rating) }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name"><Link to={`${AppRoute.Offer}/${id}`}>{title}</Link></h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
