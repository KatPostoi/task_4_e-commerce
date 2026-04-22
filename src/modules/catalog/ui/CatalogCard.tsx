import { formatCurrency } from '../../../shared/lib/currency';
import { ButtonBasket } from '../../../shared/ui/ButtonBasket/ButtonBasket';
import { ButtonFavorites } from '../../../shared/ui/ButtonFavorites/ButtonFavorites';
import './catalog-card.css';

type CatalogCardItem = {
  id: string;
  title: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
};

type CatalogCardProps = {
  item: CatalogCardItem;
  isFavorite: boolean;
  isInBasket: boolean;
  onToggleFavorite: () => void;
  onToggleBasket: () => void;
  showFavoriteButton?: boolean;
};

export const CatalogCard = ({
  item,
  isFavorite,
  isInBasket,
  onToggleFavorite,
  onToggleBasket,
  showFavoriteButton = true,
}: CatalogCardProps) => {
  return (
    <div className="catalog-wrapper_card">
      {showFavoriteButton ? (
        <ButtonFavorites active={isFavorite} onClick={onToggleFavorite} />
      ) : (
        <div />
      )}
      <div className="catalog-wrapper_card_goods-image">
        <img alt={item.image.alt} src={item.image.src} />
      </div>
      <div className="catalog-wrapper_card_description">
        <div className="catalog-wrapper_card_description_text">
          <h2 className="anonymous-pro-bold home-text-block__sm">{item.title}</h2>
          <h2 className="anonymous-pro-bold home-text-block__vsm_white">
            {formatCurrency(item.price)}
          </h2>
        </div>
        <ButtonBasket active={isInBasket} onClick={onToggleBasket} />
      </div>
    </div>
  );
};
