import type { ChangeEvent } from 'react';
import type { CartViewItem } from '../hooks/useCart';
import { formatCurrency } from '../../../shared/lib/currency';
import { ButtonFavorites } from '../../../shared/ui/ButtonFavorites/ButtonFavorites';

type BasketItemCardProps = {
  item: CartViewItem;
  isSelected: boolean;
  isFavorite: boolean;
  onSelectChange: (itemId: string, checked: boolean) => void;
  onToggleFavorite: (productId: string) => void;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onRemove: (itemId: string) => void;
};

export const BasketItemCard = ({
  item,
  isSelected,
  isFavorite,
  onSelectChange,
  onToggleFavorite,
  onIncrement,
  onDecrement,
  onRemove,
}: BasketItemCardProps) => {
  const handleSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSelectChange(item.id, event.target.checked);
  };

  return (
    <div className="goods-in-basket_wrapper">
      <div className="goods-in-basket_wrapper_image-container">
        <img
          alt={item.frame.image.alt}
          className="goods-in-basket_wrapper_image"
          src={item.frame.image.src}
        />
      </div>

      <div className="goods-in-basket_wrapper_content">
        <div className="goods-in-basket_wrapper_content_description">
          {item.source === 'default' ? (
            <ButtonFavorites
              active={isFavorite}
              onClick={() => onToggleFavorite(item.productId)}
            />
          ) : (
            <div />
          )}

          <div className="goods-in-basket_wrapper_content_description_text">
            <h2 className="anonymous-pro-bold home-text-block__sm">
              {item.frame.title}
            </h2>
            <div>
              <h2 className="anonymous-pro-bold home-text-block__vsm_grey">
                Цвет: {item.frame.colorLabel}; Стиль:{' '}
                {item.frame.style?.name ?? '-'}
              </h2>
              <h2 className="anonymous-pro-bold home-text-block__vsm_grey">
                Ширина: {item.frame.size.widthCm} см; Высота:{' '}
                {item.frame.size.heightCm} см
              </h2>
              {item.source === 'custom' ? (
                <h2 className="anonymous-pro-bold home-text-block__vsm_grey">
                  Индивидуальная рама из конструктора
                </h2>
              ) : null}
            </div>
          </div>

          <button
            className="basket-item__remove-button anonymous-pro-bold home-text-block__sm_orange"
            type="button"
            onClick={() => onRemove(item.id)}
          >
            Удалить
          </button>

          <div className="basket-item__select-control">
            <input
              aria-label={`Выбрать товар ${item.frame.title} для заказа`}
              checked={isSelected}
              className="square-agreement"
              type="checkbox"
              onChange={handleSelectChange}
            />
          </div>
        </div>

        <div className="goods-in-basket_wrapper_content_counting">
          <div className="goods-in-basket_wrapper_content_counting_box">
            <button
              aria-label="Уменьшить количество"
              className="basket-item__quantity-button"
              disabled={item.quantity <= 1}
              type="button"
              onClick={() => onDecrement(item.id)}
            >
              −
            </button>
            <h2 className="anonymous-pro-bold home-text-block__md">
              {item.quantity}
            </h2>
            <button
              aria-label="Увеличить количество"
              className="basket-item__quantity-button"
              type="button"
              onClick={() => onIncrement(item.id)}
            >
              +
            </button>
          </div>

          <h2 className="anonymous-pro-bold home-text-block__md">
            {formatCurrency(item.subtotal)}
          </h2>
        </div>
      </div>
    </div>
  );
};
