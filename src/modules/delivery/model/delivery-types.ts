import type { EntityId } from '../../../shared/types/domain';

export type DeliveryServiceType = 'pickup' | 'courier' | 'promo';

export type DeliveryService = {
  id: EntityId;
  code: string;
  type: DeliveryServiceType;
  title: string;
  description: string;
  price: number;
  etaLabel: string;
};
