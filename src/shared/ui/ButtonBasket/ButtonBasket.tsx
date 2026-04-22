import basketActiveIcon from '../../assets/images/basket-active.svg';
import basketIcon from '../../assets/images/basket.svg';
import '../IconToggleButton/icon-toggle-button.css';

type ButtonBasketProps = {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
};

export const ButtonBasket = ({
  active,
  onClick,
  disabled = false,
  className,
  ariaLabel = 'Переключить состояние товара в корзине',
}: ButtonBasketProps) => {
  return (
    <button
      aria-label={ariaLabel}
      aria-pressed={active}
      className={['icon-image-container', className ?? ''].filter(Boolean).join(' ')}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <div className="icon-image">
        <img
          alt=""
          aria-hidden="true"
          src={active ? basketActiveIcon : basketIcon}
        />
      </div>
    </button>
  );
};
