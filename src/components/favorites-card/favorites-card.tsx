import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { capitalize, ratingWidthStyle } from '../../utils/tools';
import { AppRoute } from '../../const';
import FavoriteButton from '../favorite-button';

type FavoritesCardProps = {
  offer: Offer;
};

function FavoritesCard({ offer }: FavoritesCardProps): JSX.Element {
  const { id, isPremium, previewImage, price, rating, title, type } = offer;
  return (
    <article className="favorites__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
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
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalize(type)}</p>
      </div>
    </article>
  );
}

export default FavoritesCard;
