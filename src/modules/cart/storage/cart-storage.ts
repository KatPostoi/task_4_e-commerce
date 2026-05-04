import type { CatalogItem } from '../../catalog/model/catalog-types';
import type { CustomFrame } from '../../constructor/model/constructor-types';
import { createLocalId, createTimestamp } from '../../../shared/lib/ids';
import type {
  CartItem,
  CartState,
  CartViewItem,
  ProductSnapshot,
} from '../model/cart-types';
import { createEmptyCartState } from '../model/cart-types';
import { calculateCartItemSubtotal } from '../lib/calculate-cart-totals';

const updateCartState = (
  state: CartState,
  items: CartItem[],
): CartState => {
  return {
    ...state,
    items,
    updatedAt: createTimestamp(),
  };
};

export const createCatalogSnapshot = (
  item: CatalogItem,
): ProductSnapshot => ({
  id: item.id,
  source: 'default',
  slug: item.slug,
  title: item.title,
  description: item.description,
  image: item.image,
  size: item.size,
  colorLabel: item.colorLabel,
  unitPrice: item.price,
  material: {
    id: item.material.id,
    title: item.material.title,
    pricePerCm: item.material.pricePerCm,
    swatchHex: item.material.swatchHex,
  },
  style: item.style
    ? {
        id: item.style.id,
        name: item.style.name,
        coefficient: item.style.coefficient,
      }
    : null,
});

export const createCustomSnapshot = (
  frame: CustomFrame,
): ProductSnapshot => ({
  id: frame.id,
  source: 'custom',
  slug: frame.slug,
  title: frame.title,
  description: frame.description,
  image: frame.image,
  size: frame.size,
  colorLabel: frame.material.title,
  unitPrice: frame.price,
  material: frame.material,
  style: frame.style,
});

export const createCartItem = (snapshot: ProductSnapshot): CartItem => {
  const timestamp = createTimestamp();

  return {
    id: createLocalId('cart-item'),
    productId: snapshot.id,
    source: snapshot.source,
    quantity: 1,
    snapshot,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
};

const isSameProduct = (
  item: CartItem,
  snapshot: ProductSnapshot,
): boolean => {
  return item.productId === snapshot.id && item.source === snapshot.source;
};

const mapCartItem = (
  item: CartItem,
  transform: (item: CartItem) => CartItem,
): CartItem => {
  return {
    ...transform(item),
    updatedAt: createTimestamp(),
  };
};

export const createCartViewItems = (
  items: readonly CartItem[],
): CartViewItem[] => {
  return items.map((item) => ({
    ...item,
    frame: item.snapshot,
    subtotal: calculateCartItemSubtotal(item),
  }));
};

export const getCartItemsCount = (items: readonly CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const insertSnapshot = (
  state: CartState,
  snapshot: ProductSnapshot,
): CartState => {
  const existingItem = state.items.find((item) => isSameProduct(item, snapshot));

  if (!existingItem) {
    return updateCartState(state, [...state.items, createCartItem(snapshot)]);
  }

  return updateCartState(
    state,
    state.items.map((item) =>
      item.id === existingItem.id
        ? mapCartItem(item, (entry) => ({
            ...entry,
            quantity: entry.quantity + 1,
          }))
        : item,
    ),
  );
};

export const toggleSnapshot = (
  state: CartState,
  snapshot: ProductSnapshot,
): CartState => {
  const hasProduct = state.items.some((item) => isSameProduct(item, snapshot));

  if (!hasProduct) {
    return updateCartState(state, [...state.items, createCartItem(snapshot)]);
  }

  return updateCartState(
    state,
    state.items.filter((item) => !isSameProduct(item, snapshot)),
  );
};

export const setCartItemQuantity = (
  state: CartState,
  itemId: string,
  quantity: number,
): CartState => {
  return updateCartState(
    state,
    state.items.flatMap((item) => {
      if (item.id !== itemId) {
        return item;
      }

      if (quantity <= 0) {
        return [];
      }

      return mapCartItem(item, (entry) => ({
        ...entry,
        quantity,
      }));
    }),
  );
};

export const removeCartItem = (
  state: CartState,
  itemId: string,
): CartState => {
  return updateCartState(
    state,
    state.items.filter((item) => item.id !== itemId),
  );
};

export const removeManyCartItems = (
  state: CartState,
  itemIds: string[],
): CartState => {
  const itemIdSet = new Set(itemIds);

  return updateCartState(
    state,
    state.items.filter((item) => !itemIdSet.has(item.id)),
  );
};

export const clearCartState = (): CartState => {
  return createEmptyCartState();
};

export const hasProductInCart = (
  items: readonly CartItem[],
  productId: string,
): boolean => {
  return items.some((item) => item.productId === productId);
};
