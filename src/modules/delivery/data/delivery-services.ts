import type { DeliveryService } from '../model/delivery-types';

export const deliveryServices: DeliveryService[] = [
  {
    id: 'pickup-showroom',
    code: 'pickup',
    type: 'pickup',
    title: 'Самовывоз из шоу-рума',
    description: 'Бесплатно, если удобно забрать заказ самостоятельно в рабочее время.',
    price: 0,
    etaLabel: 'Готов к выдаче после подтверждения',
  },
  {
    id: 'city-courier',
    code: 'courier-city',
    type: 'courier',
    title: 'Доставка',
    description: 'Доставка для готовых рам и небольших заказов.',
    price: 600,
    etaLabel: '3-4 рабочих дня',
  },
  {
    id: 'promo-code',
    code: 'promo',
    type: 'promo',
    title: 'Промокод',
    description: 'Введите промокод и получите скидку на ваш заказ.',
    price: 0,
    etaLabel: '',
  },
];
