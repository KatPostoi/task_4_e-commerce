import type { ChangeEvent } from 'react';
import type { CartViewItem } from '../model/cart-types';
import { formatCurrency } from '../../../shared/lib/currency';

type BasketItemCardProps = {
  item: CartViewItem;
  isSelected: boolean;
  onSelectChange: (itemId: string, checked: boolean) => void;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  disableActions?: boolean;
};

export const BasketItemCard = ({
  item,
  isSelected,
  onSelectChange,
  onIncrement,
  onDecrement,
  onRemove,
  disableActions = false,
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
            aria-label={`Удалить товар ${item.frame.title} из корзины`}
            className="basket-item__remove-button anonymous-pro-bold home-text-block__sm_orange"
            disabled={disableActions}
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
              disabled={disableActions}
              type="checkbox"
              onChange={handleSelectChange}
            />
          </div>
        </div>

        <div className="goods-in-basket_wrapper_content_counting">
          <div className="goods-in-basket_wrapper_content_counting_box">
            <button
              aria-label={`Уменьшить количество товара ${item.frame.title}`}
              className="basket-item__quantity-button"
              disabled={item.quantity <= 1 || disableActions}
              type="button"
              onClick={() => onDecrement(item.id)}
            >
              −
            </button>
            <h2 className="anonymous-pro-bold home-text-block__md">
              {item.quantity}
            </h2>
            <button
              aria-label={`Увеличить количество товара ${item.frame.title}`}
              className="basket-item__quantity-button"
              disabled={disableActions}
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
