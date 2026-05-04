import { describe, expect, it } from 'vitest';
import {
  applyDiscountToCartTotals,
  calculateCartItemSubtotal,
  calculateCartTotals,
} from './calculate-cart-totals';
import {
  createCartViewItem,
  createDeliverySelection,
  createProductSnapshot,
} from '../../../test/fixtures';

describe('calculateCartItemSubtotal', () => {
  it('returns quantity multiplied by unit price', () => {
    const item = createCartViewItem({
      quantity: 3,
      frame: createProductSnapshot({
        unitPrice: 1200,
      }),
    });

    expect(calculateCartItemSubtotal(item)).toBe(3600);
  });
});

describe('calculateCartTotals', () => {
  it('calculates items, delivery, and grand total', () => {
    const items = [
      createCartViewItem({
        id: 'item-1',
        quantity: 2,
        frame: createProductSnapshot({
          id: 'product-1',
          unitPrice: 1000,
        }),
      }),
      createCartViewItem({
        id: 'item-2',
        quantity: 1,
        frame: createProductSnapshot({
          id: 'product-2',
          unitPrice: 2500,
        }),
      }),
    ];

    expect(calculateCartTotals(items, createDeliverySelection())).toEqual({
      itemsCount: 3,
      itemsTotal: 4500,
      deliveryTotal: 600,
      discountTotal: 0,
      grandTotal: 5100,
    });
  });
});

describe('applyDiscountToCartTotals', () => {
  it('applies a valid discount and updates grand total', () => {
    const totals = calculateCartTotals(
      [createCartViewItem()],
      createDeliverySelection(),
    );

    expect(applyDiscountToCartTotals(totals, 700)).toMatchObject({
      discountTotal: 700,
      grandTotal: totals.itemsTotal + totals.deliveryTotal - 700,
    });
  });

  it('clamps discount to the pre-discount total', () => {
    const totals = calculateCartTotals(
      [createCartViewItem()],
      createDeliverySelection({
        price: 0,
      }),
    );

    expect(applyDiscountToCartTotals(totals, 999999)).toMatchObject({
      discountTotal: totals.itemsTotal,
      grandTotal: 0,
    });
  });
});
