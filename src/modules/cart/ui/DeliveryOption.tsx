import { formatCurrency } from '../../../shared/lib/currency';
import type { DeliveryService } from '../../delivery/model/delivery-types';

type DeliveryOptionProps = {
  service: DeliveryService;
  isSelected?: boolean;
  inputValue?: string;
  priceValue?: number;
  disabled?: boolean;
  showSelector?: boolean;
  inputDisabled?: boolean;
  onSelect?: (serviceId: string) => void;
  onInputChange?: (value: string) => void;
};

export const DeliveryOption = ({
  service,
  isSelected = false,
  inputValue = '',
  priceValue,
  disabled = false,
  showSelector = true,
  inputDisabled,
  onSelect,
  onInputChange,
}: DeliveryOptionProps) => {
  const auxiliaryPlaceholder =
    service.type === 'promo' ? 'PROMOKOD' : 'Адрес доставки';
  const displayPrice = priceValue ?? service.price;
  const resolvedInputDisabled =
    inputDisabled ?? (showSelector ? !isSelected || disabled : disabled);
  const inputAriaLabel =
    service.type === 'promo' ? 'Введите промокод' : 'Введите адрес доставки';

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
        {showSelector ? (
          <input
            aria-label={`Выбрать способ доставки ${service.title}`}
            checked={isSelected}
            className="square-agreement"
            disabled={disabled}
            name="delivery-service"
            type="radio"
            onChange={() => onSelect?.(service.id)}
          />
        ) : null}
      </div>

      <div className="delivery-wrapper_price">
        {service.type === 'pickup' ? (
          <div
            aria-hidden="true"
            className="delivery-wrapper_price_data delivery-wrapper_price_data_borderless"
          />
        ) : (
          <div className="delivery-wrapper_price_data">
            <input
              aria-label={inputAriaLabel}
              className="anonymous-pro-bold home-text-block__md__left data-text-input"
              disabled={resolvedInputDisabled}
              placeholder={auxiliaryPlaceholder}
              value={inputValue}
              onChange={(event) => onInputChange?.(event.target.value)}
            />
          </div>
        )}
        <h2 className="anonymous-pro-bold home-text-block__md__left delivery-wrapper_price_value">
          {formatCurrency(displayPrice)}
        </h2>
      </div>
    </div>
  );
};
