import type { CartTotals } from '../model/cart-types';
import { formatCurrency } from '../../../shared/lib/currency';
import { Button } from '../../../shared/ui/Button/Button';

type BasketSummaryProps = {
  totals: CartTotals;
  onCheckout: () => void;
  isCheckoutDisabled: boolean;
  isProcessing?: boolean;
};

export const BasketSummary = ({
  totals,
  onCheckout,
  isCheckoutDisabled,
  isProcessing = false,
}: BasketSummaryProps) => {
  return (
    <div className="basket-summary">
      <div className="total-wrapper">
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          Товары
        </h2>
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          {formatCurrency(totals.itemsTotal)}
        </h2>
      </div>

      <div className="total-wrapper">
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          Доставка
        </h2>
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          {formatCurrency(totals.deliveryTotal)}
        </h2>
      </div>

      <div className="total-wrapper">
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          Скидка
        </h2>
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          {formatCurrency(totals.discountTotal)}
        </h2>
      </div>

      <div className="total-wrapper total-wrapper_final">
        <h2 className="anonymous-pro-bold home-text-block__md__left">Итого:</h2>
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          {formatCurrency(totals.grandTotal)}
        </h2>
      </div>

      <div className="basket-wrapper_button">
        <Button
          disabled={isCheckoutDisabled || isProcessing}
          loading={isProcessing}
          onClick={onCheckout}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
