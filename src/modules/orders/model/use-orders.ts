import { storageKeys } from '../../../shared/config/storage-keys';
import { usePersistentState } from '../../../shared/hooks/usePersistentState';
import {
  createEmptyOrdersState,
  normalizeOrdersState,
  type OrderPayload,
  type OrdersState,
} from './order-types';
import {
  createOrderRecord,
  insertOrder,
} from '../storage/orders-storage';

export const useOrders = () => {
  const [ordersState, setOrdersState] = usePersistentState<OrdersState>(
    storageKeys.orders,
    {
      initialValue: createEmptyOrdersState,
      normalize: normalizeOrdersState,
    },
  );

  const createOrder = (payload: OrderPayload) => {
    const order = createOrderRecord(payload);

    setOrdersState((currentState) => insertOrder(currentState, order));

    return order;
  };

  return {
    orders: ordersState.items,
    createOrder,
  };
};
