import type {
  CartTotals,
  DeliverySelection,
  ProductSnapshot,
} from '../../cart/model/cart-types';
import type {
  EntityId,
  FrameSource,
  PersistedCollection,
  TimestampedRecord,
} from '../../../shared/types/domain';
import {
  asNullableString,
  asNumber,
  asPositiveInteger,
  asString,
  createPersistedCollection,
  isObjectRecord,
  normalizePersistedCollection,
} from '../../../shared/lib/guards';
import { normalizeProductSnapshot } from '../../cart/model/cart-types';

export type OrderCustomer = {
  fullName: string;
  phone: string;
  email: string;
  comment: string | null;
};

export type OrderDelivery = DeliverySelection & {
  address: string | null;
  note: string | null;
};

export type OrderItem = {
  id: EntityId;
  productId: EntityId;
  source: FrameSource;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  snapshot: ProductSnapshot;
};

export type OrderPayload = {
  customer: OrderCustomer;
  delivery: OrderDelivery;
  items: OrderItem[];
  totals: CartTotals;
  createdAt: string;
};

export type OrderStatus = 'created';

export type Order = TimestampedRecord & {
  id: EntityId;
  status: OrderStatus;
  payload: OrderPayload;
};

export type OrdersState = PersistedCollection<Order>;

const normalizeOrderCustomer = (value: unknown): OrderCustomer | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const fullName = asString(value.fullName);
  const phone = asString(value.phone);
  const email = asString(value.email);
  const comment = asNullableString(value.comment);

  if (!fullName || !phone || !email) {
    return null;
  }

  return { fullName, phone, email, comment };
};

const normalizeDeliverySelection = (
  value: unknown,
): DeliverySelection | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const serviceId = asString(value.serviceId);
  const title = asString(value.title);
  const price = asNumber(value.price, NaN);

  if (!serviceId || !title || !Number.isFinite(price)) {
    return null;
  }

  return { serviceId, title, price };
};

const normalizeOrderDelivery = (value: unknown): OrderDelivery | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const selection = normalizeDeliverySelection(value);
  if (!selection) {
    return null;
  }

  return {
    ...selection,
    address: asNullableString(value.address),
    note: asNullableString(value.note),
  };
};

const normalizeOrderItem = (value: unknown): OrderItem | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const id = asString(value.id);
  const productId = asString(value.productId);
  const source = value.source === 'custom' ? 'custom' : 'default';
  const quantity = asPositiveInteger(value.quantity);
  const unitPrice = asNumber(value.unitPrice, NaN);
  const lineTotal = asNumber(value.lineTotal, NaN);
  const snapshot = normalizeProductSnapshot(value.snapshot);

  if (
    !id ||
    !productId ||
    !Number.isFinite(unitPrice) ||
    !Number.isFinite(lineTotal) ||
    !snapshot
  ) {
    return null;
  }

  return {
    id,
    productId,
    source,
    quantity,
    unitPrice,
    lineTotal,
    snapshot,
  };
};

const normalizeCartTotals = (value: unknown): CartTotals | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const itemsCount = asPositiveInteger(value.itemsCount, 0);
  const itemsTotal = asNumber(value.itemsTotal, NaN);
  const deliveryTotal = asNumber(value.deliveryTotal, NaN);
  const discountTotal = asNumber(value.discountTotal, NaN);
  const grandTotal = asNumber(value.grandTotal, NaN);

  if (
    !Number.isFinite(itemsTotal) ||
    !Number.isFinite(deliveryTotal) ||
    !Number.isFinite(discountTotal) ||
    !Number.isFinite(grandTotal)
  ) {
    return null;
  }

  return {
    itemsCount,
    itemsTotal,
    deliveryTotal,
    discountTotal,
    grandTotal,
  };
};

const normalizeOrderPayload = (value: unknown): OrderPayload | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const customer = normalizeOrderCustomer(value.customer);
  const delivery = normalizeOrderDelivery(value.delivery);
  const totals = normalizeCartTotals(value.totals);
  const rawItems = Array.isArray(value.items) ? value.items : [];
  const items = rawItems
    .map((item) => normalizeOrderItem(item))
    .filter((item): item is OrderItem => item !== null);
  const createdAt = asString(value.createdAt);

  if (!customer || !delivery || !totals || !createdAt || items.length === 0) {
    return null;
  }

  return {
    customer,
    delivery,
    items,
    totals,
    createdAt,
  };
};

export const createEmptyOrdersState = (): OrdersState => {
  return createPersistedCollection<Order>();
};

export const normalizeOrder = (value: unknown): Order | null => {
  if (!isObjectRecord(value)) {
    return null;
  }

  const id = asString(value.id);
  const status = value.status === 'created' ? 'created' : 'created';
  const payload = normalizeOrderPayload(value.payload);
  const createdAt = asString(value.createdAt);
  const updatedAt = asString(value.updatedAt, createdAt);

  if (!id || !payload || !createdAt || !updatedAt) {
    return null;
  }

  return {
    id,
    status,
    payload,
    createdAt,
    updatedAt,
  };
};

export const normalizeOrdersState = (value: unknown): OrdersState => {
  return normalizePersistedCollection(value, normalizeOrder);
};
