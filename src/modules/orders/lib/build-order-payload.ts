import type { CartViewItem, DeliverySelection } from '../../cart/model/cart-types';
import {
  applyDiscountToCartTotals,
  calculateCartTotals,
} from '../../cart/lib/calculate-cart-totals';
import { createTimestamp } from '../../../shared/lib/ids';
import type {
  OrderCustomer,
  OrderDelivery,
  OrderPayload,
} from '../model/order-types';

type BuildOrderPayloadInput = {
  customer: OrderCustomer;
  delivery: DeliverySelection;
  deliveryAddress: string | null;
  items: CartViewItem[];
  discountTotal?: number;
  createdAt?: string;
};

const normalizeCustomer = (customer: OrderCustomer): OrderCustomer => {
  return {
    fullName: customer.fullName.trim(),
    phone: customer.phone.trim(),
    email: customer.email.trim(),
    comment: customer.comment?.trim() || null,
  };
};

const normalizeDelivery = (
  delivery: DeliverySelection,
  deliveryAddress: string | null,
): OrderDelivery => {
  return {
    ...delivery,
    address: deliveryAddress?.trim() || null,
    note: null,
  };
};

export const buildOrderPayload = ({
  customer,
  delivery,
  deliveryAddress,
  items,
  discountTotal = 0,
  createdAt = createTimestamp(),
}: BuildOrderPayloadInput): OrderPayload => {
  const normalizedCustomer = normalizeCustomer(customer);
  const normalizedDelivery = normalizeDelivery(delivery, deliveryAddress);
  const totals = applyDiscountToCartTotals(
    calculateCartTotals(items, normalizedDelivery),
    discountTotal,
  );

  return {
    customer: normalizedCustomer,
    delivery: normalizedDelivery,
    items: items.map((item) => ({
      id: item.id,
      productId: item.productId,
      source: item.source,
      quantity: item.quantity,
      unitPrice: item.frame.unitPrice,
      lineTotal: item.subtotal,
      snapshot: item.frame,
    })),
    totals,
    createdAt,
  };
};
