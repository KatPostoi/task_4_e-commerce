import { useEffect, useMemo, useState } from 'react';
import { BasketEmptyState } from '../../modules/cart/ui/BasketEmptyState';
import { BasketItemCard } from '../../modules/cart/ui/BasketItemCard';
import { BasketSummary } from '../../modules/cart/ui/BasketSummary';
import { DeliveryOption } from '../../modules/cart/ui/DeliveryOption';
import { applyDiscountToCartTotals, calculateCartTotals } from '../../modules/cart/lib/calculate-cart-totals';
import { deliveryOptions, promoCodeService, requiresDeliveryAddress } from '../../modules/cart/lib/checkout-services';
import { calculatePromoDiscountTotal } from '../../modules/cart/lib/promo-code';
import type { DeliverySelection } from '../../modules/cart/model/cart-types';
import { useCart } from '../../modules/cart/model/use-cart';
import { Header } from '../../modules/layout/ui/Header';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';
import { buildOrderPayload } from '../../modules/orders/lib/build-order-payload';
import { useOrders } from '../../modules/orders/model/use-orders';
import { TopicSection } from '../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../shared/ui/TopicSection/TopicSectionTitle';
import { TextPosition } from '../../shared/ui/TopicSection/types';
import './basket-page.css';

const guestOrderCustomer = {
  fullName: 'Гость',
  phone: 'Не указан',
  email: 'guest@baguette-basket.local',
  comment: null,
};

const BasketPage = () => {
  const { items, increment, decrement, remove, removeMany, clear } = useCart();
  const { createOrder } = useOrders();
  const [selectedServiceId, setSelectedServiceId] = useState(deliveryOptions[0]?.id ?? '');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>({});
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectionMap((currentMap) => {
      const nextMap: Record<string, boolean> = {};

      items.forEach((item) => {
        nextMap[item.id] = currentMap[item.id] ?? true;
      });

      return nextMap;
    });
  }, [items]);

  const selectedService =
    deliveryOptions.find((service) => service.id === selectedServiceId) ?? deliveryOptions[0] ?? null;

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectionMap[item.id] ?? true);
  }, [items, selectionMap]);

  const deliverySelection = useMemo<DeliverySelection | null>(() => {
    if (!selectedService) {
      return null;
    }

    return {
      serviceId: selectedService.id,
      title: selectedService.title,
      price: selectedService.price,
    };
  }, [selectedService]);

  const totalsBeforeDiscount = useMemo(() => {
    return calculateCartTotals(selectedItems, deliverySelection);
  }, [deliverySelection, selectedItems]);

  const promoDiscountTotal = useMemo(() => {
    return calculatePromoDiscountTotal(totalsBeforeDiscount.grandTotal, promoCode);
  }, [promoCode, totalsBeforeDiscount.grandTotal]);

  const totals = useMemo(() => {
    return applyDiscountToCartTotals(totalsBeforeDiscount, promoDiscountTotal);
  }, [promoDiscountTotal, totalsBeforeDiscount]);

  useEffect(() => {
    setFeedbackMessage(null);
    setErrorMessage(null);
  }, [deliveryAddress, promoCode, selectedServiceId, selectionMap]);

  const disableCheckout = useMemo(() => {
    if (!selectedService || selectedItems.length === 0) {
      return true;
    }

    if (requiresDeliveryAddress(selectedService) && deliveryAddress.trim().length === 0) {
      return true;
    }

    return false;
  }, [deliveryAddress, selectedItems.length, selectedService]);

  const validateCheckout = (): string | null => {
    if (!selectedService || !deliverySelection || selectedItems.length === 0) {
      return 'Выберите товары и способ доставки.';
    }

    if (requiresDeliveryAddress(selectedService) && deliveryAddress.trim().length === 0) {
      return 'Укажите адрес доставки.';
    }

    return null;
  };

  const handleCheckout = () => {
    const validationError = validateCheckout();

    if (validationError || !deliverySelection) {
      setFeedbackMessage(null);
      setErrorMessage(validationError ?? 'Не удалось оформить заказ.');
      return;
    }

    // Подготовить JSON для отправки на сервер
    const payload = buildOrderPayload({
      customer: guestOrderCustomer,
      delivery: deliverySelection,
      deliveryAddress: requiresDeliveryAddress(selectedService) ? deliveryAddress : null,
      items: selectedItems,
      discountTotal: promoDiscountTotal,
    });

    const order = createOrder(payload);

    // Показать JSON, подготовленный для отправки на сервер
    window.alert(JSON.stringify(order, null, 2));

    if (selectedItems.length === items.length) {
      clear();
    } else {
      removeMany(selectedItems.map((item) => item.id));
    }

    setDeliveryAddress('');
    setPromoCode('');
    setSelectionMap({});
    setErrorMessage(null);
    setFeedbackMessage(`Заказ ${order.id} сохранён локально.`);
  };

  return (
    <div className="BasketPage">
      <MainWrapper>
        <Header />

        <TopicSection className="basket-section">
          <TopicSectionTitle textPosition={TextPosition.LEFT}>Корзина</TopicSectionTitle>

          <div className="basket-wrapper">
            <div className="change-selection">
              <button
                className="change-selection_button anonymous-pro-bold home-text-block__sm"
                disabled={items.length === 0}
                type="button"
                onClick={clear}
              >
                Очистить корзину
              </button>
              <button
                className="change-selection_button anonymous-pro-bold home-text-block__sm"
                disabled={items.length === 0}
                type="button"
                onClick={() =>
                  setSelectionMap(
                    items.reduce<Record<string, boolean>>((acc, item) => {
                      acc[item.id] = true;
                      return acc;
                    }, {}),
                  )
                }
              >
                Выбрать все
              </button>
            </div>

            {errorMessage ? (
              <p className="basket-message basket-message_error anonymous-pro-bold home-text-block__vsm_grey">
                {errorMessage}
              </p>
            ) : null}

            {feedbackMessage ? (
              <p className="basket-message basket-message_success anonymous-pro-bold home-text-block__vsm_grey">
                {feedbackMessage}
              </p>
            ) : null}

            {items.length === 0 ? (
              <BasketEmptyState />
            ) : (
              <>
                {items.map((item) => (
                  <BasketItemCard
                    isSelected={selectionMap[item.id] ?? true}
                    item={item}
                    key={item.id}
                    onDecrement={decrement}
                    onIncrement={increment}
                    onRemove={remove}
                    onSelectChange={(itemId, checked) =>
                      setSelectionMap((currentMap) => ({
                        ...currentMap,
                        [itemId]: checked,
                      }))
                    }
                  />
                ))}

                {deliveryOptions.map((service) => (
                  <DeliveryOption
                    inputValue={service.type === 'courier' ? deliveryAddress : ''}
                    isSelected={selectedService?.id === service.id}
                    key={service.id}
                    service={service}
                    onInputChange={service.type === 'courier' ? setDeliveryAddress : undefined}
                    onSelect={(serviceId) => {
                      setSelectedServiceId(serviceId);

                      const nextService = deliveryOptions.find((item) => item.id === serviceId);

                      if (!requiresDeliveryAddress(nextService)) {
                        setDeliveryAddress('');
                      }
                    }}
                  />
                ))}

                {promoCodeService ? (
                  <DeliveryOption
                    inputDisabled={false}
                    inputValue={promoCode}
                    key={promoCodeService.id}
                    priceValue={promoDiscountTotal}
                    service={promoCodeService}
                    showSelector={false}
                    onInputChange={setPromoCode}
                  />
                ) : null}

                <BasketSummary isCheckoutDisabled={disableCheckout} totals={totals} onCheckout={handleCheckout} />
              </>
            )}
          </div>
        </TopicSection>
      </MainWrapper>
    </div>
  );
};

export default BasketPage;
