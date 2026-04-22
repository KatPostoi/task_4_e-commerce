import { createContext } from 'react';
import type { CatalogItem } from '../../catalog/model/catalog-types';
import type { CustomFrame } from '../../constructor/model/constructor-types';
import type { CartViewItem } from './cart-types';

export type CartContextValue = {
  items: CartViewItem[];
  itemCount: number;
  addCatalogItem: (item: CatalogItem) => void;
  addCustomFrame: (frame: CustomFrame) => void;
  toggleCatalogItem: (item: CatalogItem) => void;
  toggleCustomFrame: (frame: CustomFrame) => void;
  setQuantity: (itemId: string, quantity: number) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  remove: (itemId: string) => void;
  removeMany: (itemIds: string[]) => void;
  clear: () => void;
  isProductInCart: (productId: string) => boolean;
};

export const CartContext = createContext<CartContextValue | null>(null);
