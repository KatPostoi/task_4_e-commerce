import basketActiveIcon from '../../assets/images/basket-active.svg';
import basketIcon from '../../assets/images/basket.svg';
import '../IconToggleButton/icon-toggle-button.css';

type ButtonBasketProps = {
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
};

export const ButtonBasket = ({
  active,
  onClick,
  disabled = false,
  className,
}: ButtonBasketProps) => {
  return (
    <button
      aria-pressed={active}
      className={['icon-image-container', className ?? ''].filter(Boolean).join(' ')}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <div className="icon-image">
        <img alt="IconBasket" src={active ? basketActiveIcon : basketIcon} />
      </div>
    </button>
  );
};
