import { useMemo } from 'react';
import { materialById } from '../../catalog/data/materials';
import { styleById } from '../../catalog/data/styles';
import type { CatalogItem } from '../../catalog/model/catalog-types';
import type { CustomFrame } from '../../constructor/model/constructor-types';
import { storageKeys } from '../../../shared/config/storage-keys';
import { usePersistentState } from '../../../shared/hooks/usePersistentState';
import { createLocalId, createTimestamp } from '../../../shared/lib/ids';
import {
  createEmptyCartState,
  normalizeCartState,
  type CartItem,
  type CartState,
  type CartTotals,
  type DeliverySelection,
  type ProductSnapshot,
} from '../model/cart-types';

export type CartViewItem = CartItem & {
  frame: ProductSnapshot;
  subtotal: number;
};

const updateCartState = (
  state: CartState,
  items: CartItem[],
): CartState => ({
  ...state,
  items,
  updatedAt: createTimestamp(),
});

const createCatalogSnapshot = (item: CatalogItem): ProductSnapshot => {
  const material = materialById.get(item.materialId);
  const style = item.styleId ? styleById.get(item.styleId) ?? null : null;

  if (!material) {
    throw new Error(`Unknown material: ${item.materialId}`);
  }

  return {
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
      id: material.id,
      title: material.title,
      pricePerCm: material.pricePerCm,
      swatchHex: material.swatchHex,
    },
    style: style
      ? {
          id: style.id,
          name: style.name,
          coefficient: style.coefficient,
        }
      : null,
  };
};

const createCustomSnapshot = (frame: CustomFrame): ProductSnapshot => ({
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

const createCartItem = (snapshot: ProductSnapshot): CartItem => {
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

const isSameProduct = (item: CartItem, snapshot: ProductSnapshot) => {
  return item.productId === snapshot.id && item.source === snapshot.source;
};

const mapCartItem = (
  item: CartItem,
  transform: (item: CartItem) => CartItem,
): CartItem => {
  const nextItem = transform(item);

  return {
    ...nextItem,
    updatedAt: createTimestamp(),
  };
};

const calculateSubtotal = (item: CartItem) => {
  return item.quantity * item.snapshot.unitPrice;
};

export const calculateCartTotals = (
  items: CartItem[],
  delivery: DeliverySelection | null,
): CartTotals => {
  const itemsTotal = items.reduce((sum, item) => sum + calculateSubtotal(item), 0);
  const deliveryTotal = delivery?.price ?? 0;
  const discountTotal = 0;

  return {
    itemsCount: items.reduce((sum, item) => sum + item.quantity, 0),
    itemsTotal,
    deliveryTotal,
    discountTotal,
    grandTotal: itemsTotal + deliveryTotal - discountTotal,
  };
};

export const useCart = () => {
  const [cartState, setCartState] = usePersistentState<CartState>(
    storageKeys.cart,
    {
      initialValue: createEmptyCartState,
      normalize: normalizeCartState,
    },
  );

  const items = useMemo<CartViewItem[]>(() => {
    return cartState.items.map((item) => ({
      ...item,
      frame: item.snapshot,
      subtotal: calculateSubtotal(item),
    }));
  }, [cartState.items]);

  const itemCount = useMemo(() => {
    return cartState.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartState.items]);

  const upsertSnapshot = (snapshot: ProductSnapshot) => {
    setCartState((currentState) => {
      const existingItem = currentState.items.find((item) =>
        isSameProduct(item, snapshot),
      );

      if (!existingItem) {
        return updateCartState(currentState, [
          ...currentState.items,
          createCartItem(snapshot),
        ]);
      }

      return updateCartState(
        currentState,
        currentState.items.map((item) =>
          item.id === existingItem.id
            ? mapCartItem(item, (entry) => ({
                ...entry,
                quantity: entry.quantity + 1,
              }))
            : item,
        ),
      );
    });
  };

  const toggleSnapshot = (snapshot: ProductSnapshot) => {
    setCartState((currentState) => {
      const hasProduct = currentState.items.some((item) => isSameProduct(item, snapshot));

      if (!hasProduct) {
        return updateCartState(currentState, [
          ...currentState.items,
          createCartItem(snapshot),
        ]);
      }

      return updateCartState(
        currentState,
        currentState.items.filter((item) => !isSameProduct(item, snapshot)),
      );
    });
  };

  const setQuantity = (itemId: string, quantity: number) => {
    setCartState((currentState) =>
      updateCartState(
        currentState,
        currentState.items.flatMap((item) => {
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
      ),
    );
  };

  const increment = (itemId: string) => {
    const target = cartState.items.find((item) => item.id === itemId);
    if (!target) {
      return;
    }

    setQuantity(itemId, target.quantity + 1);
  };

  const decrement = (itemId: string) => {
    const target = cartState.items.find((item) => item.id === itemId);
    if (!target) {
      return;
    }

    setQuantity(itemId, target.quantity - 1);
  };

  const remove = (itemId: string) => {
    setCartState((currentState) =>
      updateCartState(
        currentState,
        currentState.items.filter((item) => item.id !== itemId),
      ),
    );
  };

  const removeMany = (itemIds: string[]) => {
    const itemIdSet = new Set(itemIds);

    setCartState((currentState) =>
      updateCartState(
        currentState,
        currentState.items.filter((item) => !itemIdSet.has(item.id)),
      ),
    );
  };

  const clear = () => {
    setCartState(createEmptyCartState());
  };

  const addCatalogItem = (item: CatalogItem) => {
    upsertSnapshot(createCatalogSnapshot(item));
  };

  const addCustomFrame = (frame: CustomFrame) => {
    upsertSnapshot(createCustomSnapshot(frame));
  };

  const toggleCatalogItem = (item: CatalogItem) => {
    toggleSnapshot(createCatalogSnapshot(item));
  };

  const toggleCustomFrame = (frame: CustomFrame) => {
    toggleSnapshot(createCustomSnapshot(frame));
  };

  const isProductInCart = (productId: string) => {
    return cartState.items.some((item) => item.productId === productId);
  };

  return {
    items,
    itemCount,
    addCatalogItem,
    addCustomFrame,
    toggleCatalogItem,
    toggleCustomFrame,
    setQuantity,
    increment,
    decrement,
    remove,
    removeMany,
    clear,
    isProductInCart,
    calculateTotals: (delivery: DeliverySelection | null) =>
      calculateCartTotals(cartState.items, delivery),
  };
};
