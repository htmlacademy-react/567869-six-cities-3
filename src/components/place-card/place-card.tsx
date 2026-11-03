import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Offer } from '../../types/offer';
import { capitalize, ratingWidthStyle } from '../../utils/tools';
import { AppRoute } from '../../const';
import FavoriteButton from '../favorite-button';


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
    previewImage,
    title,
    price,
    rating,
    type
  } = offer;

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
          <FavoriteButton offerId={id} />
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
