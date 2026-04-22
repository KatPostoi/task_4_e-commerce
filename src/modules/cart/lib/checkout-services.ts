import { deliveryServices } from '../../delivery/data/delivery-services';
import type { DeliveryService } from '../../delivery/model/delivery-types';

export const deliveryOptions = deliveryServices.filter(
  (service) => service.type !== 'promo',
);

export const promoCodeService =
  deliveryServices.find((service) => service.type === 'promo') ?? null;

export const requiresDeliveryAddress = (
  service: DeliveryService | null | undefined,
): boolean => {
  return service?.type === 'courier';
};
