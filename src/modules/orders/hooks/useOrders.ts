import { storageKeys } from '../../../shared/config/storage-keys';
import { usePersistentState } from '../../../shared/hooks/usePersistentState';
import { createLocalId, createTimestamp } from '../../../shared/lib/ids';
import {
  createEmptyOrdersState,
  normalizeOrdersState,
  type Order,
  type OrderPayload,
  type OrdersState,
} from '../model/order-types';

export const useOrders = () => {
  const [ordersState, setOrdersState] = usePersistentState<OrdersState>(
    storageKeys.orders,
    {
      initialValue: createEmptyOrdersState,
      normalize: normalizeOrdersState,
    },
  );

  const createOrder = (payload: OrderPayload): Order => {
    const timestamp = createTimestamp();
    const order: Order = {
      id: createLocalId('order'),
      status: 'created',
      payload,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setOrdersState((currentState) => ({
      ...currentState,
      items: [order, ...currentState.items],
      updatedAt: timestamp,
    }));

    return order;
  };

  return {
    orders: ordersState.items,
    createOrder,
  };
};
