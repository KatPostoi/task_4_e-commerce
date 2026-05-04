import { createLocalId, createTimestamp } from '../../../shared/lib/ids';
import type {
  Order,
  OrderPayload,
  OrdersState,
} from '../model/order-types';

export const createOrderRecord = (payload: OrderPayload): Order => {
  const timestamp = createTimestamp();

  return {
    id: createLocalId('order'),
    status: 'created',
    payload,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

export const insertOrder = (
  state: OrdersState,
  order: Order,
): OrdersState => {
  return {
    ...state,
    items: [order, ...state.items],
    updatedAt: order.updatedAt,
  };
};
