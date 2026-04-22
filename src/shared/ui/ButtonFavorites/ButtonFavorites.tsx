import favoritesActiveIcon from '../../assets/images/favorites-active.svg';
import favoritesIcon from '../../assets/images/favorites.svg';
import '../IconToggleButton/icon-toggle-button.css';

type ButtonFavoritesProps = {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export const ButtonFavorites = ({
  active,
  onClick,
  disabled = false,
  className,
}: ButtonFavoritesProps) => {
  return (
    <button
      aria-pressed={active}
      className={['icon-image-container', className ?? ''].filter(Boolean).join(' ')}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <div className="icon-image">
        <img
          alt="IconFavorites"
          src={active ? favoritesActiveIcon : favoritesIcon}
        />
      </div>
    </button>
  );
};
