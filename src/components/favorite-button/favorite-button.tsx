import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';
import { changeFavoriteStatusAction } from '../../store/action';

type FavoriteButtonProps = {
  offerId: string;
  variant?: 'place-card' | 'offer';
};

function FavoriteButton({
  offerId,
  variant = 'place-card',
}: FavoriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isFavorite = useAppSelector((state) =>
    state.favorites.some((favorite) => favorite.id === offerId)
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const handleClick = async () => {
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
        offerId,
        isFavorite: !isFavorite,
      }));
    } finally {
      setIsUpdating(false);
    }
  };

  const buttonClassName = clsx(
    `${variant}__bookmark-button`,
    'button',
    {
      [`${variant}__bookmark-button--active`]: isFavorite,
    }
  );

  const iconClassName = `${variant}__bookmark-icon`;
  const isOffer = variant === 'offer';

  return (
    <button
      className={buttonClassName}
      type="button"
      aria-pressed={isFavorite}
      disabled={isUpdating || authorizationStatus === AuthorizationStatus.Unknown}
      onClick={() => {
        void handleClick();
      }}
    >
      <svg
        className={iconClassName}
        width={isOffer ? 31 : 18}
        height={isOffer ? 33 : 19}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
