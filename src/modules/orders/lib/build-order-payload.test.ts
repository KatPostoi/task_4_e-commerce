import { describe, expect, it } from 'vitest';
import {
  createCartViewItem,
  createDeliverySelection,
} from '../../../test/fixtures';
import { buildOrderPayload } from './build-order-payload';

describe('buildOrderPayload', () => {
  it('normalizes customer and delivery fields and applies discount to totals', () => {
    const item = createCartViewItem({
      id: 'cart-item-1',
      quantity: 2,
    });

    const payload = buildOrderPayload({
      customer: {
        fullName: '  Иван Петров  ',
        phone: '  +79990000000  ',
        email: '  ivan@example.com  ',
        comment: '  Позвонить заранее  ',
      },
      delivery: createDeliverySelection(),
      deliveryAddress: '  Москва, Тверская 1  ',
      items: [item],
      discountTotal: 300,
      createdAt: '2026-04-22T12:00:00.000Z',
    });

    expect(payload.customer).toEqual({
      fullName: 'Иван Петров',
      phone: '+79990000000',
      email: 'ivan@example.com',
      comment: 'Позвонить заранее',
    });

    expect(payload.delivery).toEqual({
      serviceId: 'city-courier',
      title: 'Доставка',
      price: 600,
      address: 'Москва, Тверская 1',
      note: null,
    });

    expect(payload.items).toHaveLength(1);
    expect(payload.items[0]).toMatchObject({
      id: 'cart-item-1',
      productId: item.productId,
      quantity: 2,
      unitPrice: item.frame.unitPrice,
      lineTotal: item.subtotal,
    });

    expect(payload.totals).toEqual({
      itemsCount: 2,
      itemsTotal: item.subtotal,
      deliveryTotal: 600,
      discountTotal: 300,
      grandTotal: item.subtotal + 600 - 300,
    });
  });
});
