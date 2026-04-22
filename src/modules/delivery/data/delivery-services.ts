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
    title: 'Курьер по Москве',
    description: 'Базовая городская доставка для готовых рам и небольших заказов.',
    price: 600,
    etaLabel: '1-2 рабочих дня',
  },
  {
    id: 'express-courier',
    code: 'courier-express',
    type: 'express',
    title: 'Экспресс-доставка',
    description: 'Ускоренный вариант, если заказ нужен к ближайшей дате или событию.',
    price: 950,
    etaLabel: 'В день готовности или на следующий день',
  },
];

export const deliveryServiceById = new Map(
  deliveryServices.map((service) => [service.id, service] as const),
);
