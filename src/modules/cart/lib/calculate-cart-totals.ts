import type {
  CartItem,
  CartTotals,
  DeliverySelection,
} from '../model/cart-types';

export const calculateCartItemSubtotal = (item: CartItem): number => {
  return item.quantity * item.snapshot.unitPrice;
};

export const calculateCartTotals = (
  items: readonly CartItem[],
  delivery: DeliverySelection | null,
): CartTotals => {
  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const itemsTotal = items.reduce(
    (sum, item) => sum + calculateCartItemSubtotal(item),
    0,
  );
  const deliveryTotal = delivery?.price ?? 0;
  const discountTotal = 0;

  return {
    itemsCount,
    itemsTotal,
    deliveryTotal,
    discountTotal,
    grandTotal: itemsTotal + deliveryTotal,
  };
};

export const applyDiscountToCartTotals = (
  totals: CartTotals,
  rawDiscountTotal: number,
): CartTotals => {
  const preDiscountTotal = totals.itemsTotal + totals.deliveryTotal;
  const discountTotal = Math.min(
    Math.max(0, rawDiscountTotal),
    preDiscountTotal,
  );

  return {
    ...totals,
    discountTotal,
    grandTotal: preDiscountTotal - discountTotal,
  };
};
