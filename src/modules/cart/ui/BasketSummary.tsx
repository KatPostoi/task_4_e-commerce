import { formatCurrency } from '../../../shared/lib/currency';
import { Button } from '../../../shared/ui/Button/Button';

type BasketSummaryProps = {
  totalPrice: number;
  onCheckout: () => void;
  isCheckoutDisabled: boolean;
  isProcessing?: boolean;
};

export const BasketSummary = ({
  totalPrice,
  onCheckout,
  isCheckoutDisabled,
  isProcessing = false,
}: BasketSummaryProps) => {
  return (
    <div className="basket-summary">
      <div className="total-wrapper total-wrapper_final">
        <h2 className="anonymous-pro-bold home-text-block__md__left">Итого:</h2>
        <h2 className="anonymous-pro-bold home-text-block__md__left">
          {formatCurrency(totalPrice)}
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
