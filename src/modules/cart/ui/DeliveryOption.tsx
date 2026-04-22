import { formatCurrency } from '../../../shared/lib/currency';
import type { DeliveryService } from '../../delivery/model/delivery-types';

type DeliveryOptionProps = {
  service: DeliveryService;
  isSelected: boolean;
  address: string;
  onSelect: (serviceId: string) => void;
  onAddressChange: (value: string) => void;
};

export const DeliveryOption = ({
  service,
  isSelected,
  address,
  onSelect,
  onAddressChange,
}: DeliveryOptionProps) => {
  return (
    <div className="delivery-wrapper">
      <div className="delivery-wrapper_agree">
        <div>
          <h2 className="anonymous-pro-bold home-text-block__sm">
            {service.title}
          </h2>
          <p className="anonymous-pro-bold home-text-block__vsm_grey">
            {service.description} {service.etaLabel ? `· ${service.etaLabel}` : ''}
          </p>
        </div>
        <input
          aria-label={`Выбрать способ доставки ${service.title}`}
          checked={isSelected}
          className="square-agreement"
          name="delivery-service"
          type="checkbox"
          onChange={() => onSelect(service.id)}
        />
      </div>

      <div className="delivery-wrapper_price">
        <div className="delivery-wrapper_price_data">
          {service.type === 'pickup' ? (
            <p className="anonymous-pro-bold home-text-block__vsm_grey">
              Адрес не требуется
            </p>
          ) : (
            <input
              className="anonymous-pro-bold home-text-block__md__left data-text-input"
              disabled={!isSelected}
              placeholder="Адрес доставки"
              value={address}
              onChange={(event) => onAddressChange(event.target.value)}
            />
          )}
        </div>
        <h2 className="anonymous-pro-bold home-text-block__md__left delivery-wrapper_price_value">
          {formatCurrency(service.price)}
        </h2>
      </div>
    </div>
  );
};
