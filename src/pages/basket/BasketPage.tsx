import { useEffect, useMemo, useState } from 'react';
import { BasketEmptyState } from '../../modules/cart/ui/BasketEmptyState';
import { BasketItemCard } from '../../modules/cart/ui/BasketItemCard';
import { BasketSummary } from '../../modules/cart/ui/BasketSummary';
import { DeliveryOption } from '../../modules/cart/ui/DeliveryOption';
import { useCart } from '../../modules/cart/hooks/useCart';
import { useFavoriteIds } from '../../modules/catalog/hooks/useFavoriteIds';
import { deliveryServices } from '../../modules/delivery/data/delivery-services';
import { Header } from '../../modules/layout/ui/Header';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';
import { useOrders } from '../../modules/orders/hooks/useOrders';
import { TopicSection } from '../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../shared/ui/TopicSection/TopicSectionTitle';
import { TextPosition } from '../../shared/ui/TopicSection/types';
import './basket-page.css';

const BasketPage = () => {
  const {
    items,
    increment,
    decrement,
    remove,
    removeMany,
    clear,
  } = useCart();
  const { isFavorite, toggle } = useFavoriteIds();
  const { createOrder } = useOrders();
  const [selectedServiceId, setSelectedServiceId] = useState(
    deliveryServices[0]?.id ?? '',
  );
  const [deliveryAddress, setDeliveryAddress] = useState('');
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
    deliveryServices.find((service) => service.id === selectedServiceId) ??
    deliveryServices[0];

  const selectedItems = useMemo(() => {
    return items.filter((item) => selectionMap[item.id] ?? true);
  }, [items, selectionMap]);

  const totals = useMemo(() => {
    const itemsCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
    const itemsTotal = selectedItems.reduce((sum, item) => sum + item.subtotal, 0);
    const deliveryTotal = selectedService?.price ?? 0;
    const discountTotal = 0;

    return {
      itemsCount,
      itemsTotal,
      deliveryTotal,
      discountTotal,
      grandTotal: itemsTotal + deliveryTotal - discountTotal,
    };
  }, [selectedItems, selectedService]);

  const disableCheckout =
    selectedItems.length === 0 ||
    (selectedService?.type !== 'pickup' && deliveryAddress.trim().length === 0);

  const handleCheckout = () => {
    if (!selectedService || selectedItems.length === 0) {
      return;
    }

    if (
      selectedService.type !== 'pickup' &&
      deliveryAddress.trim().length === 0
    ) {
      setFeedbackMessage(null);
      setErrorMessage('Укажите адрес доставки.');
      return;
    }

    const createdAt = new Date().toISOString();

    createOrder({
      customer: {
        fullName: 'Гость',
        phone: 'Не указан',
        email: 'guest@example.local',
        comment: null,
      },
      delivery: {
        serviceId: selectedService.id,
        title: selectedService.title,
        price: selectedService.price,
        address:
          selectedService.type === 'pickup' ? null : deliveryAddress.trim(),
        note: null,
      },
      items: selectedItems.map((item) => ({
        id: item.id,
        productId: item.productId,
        source: item.source,
        quantity: item.quantity,
        unitPrice: item.frame.unitPrice,
        lineTotal: item.subtotal,
        snapshot: item.frame,
      })),
      totals,
      createdAt,
    });

    removeMany(selectedItems.map((item) => item.id));
    setErrorMessage(null);
    setFeedbackMessage('Заказ сохранён локально.');
    setDeliveryAddress('');
  };

  return (
    <div className="BasketPage">
      <MainWrapper>
        <Header />

        <TopicSection className="basket-section">
          <TopicSectionTitle textPosition={TextPosition.LEFT}>
            Корзина
          </TopicSectionTitle>

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
              <p className="anonymous-pro-bold home-text-block__vsm_grey">
                {errorMessage}
              </p>
            ) : null}

            {feedbackMessage ? (
              <p className="anonymous-pro-bold home-text-block__vsm_grey">
                {feedbackMessage}
              </p>
            ) : null}

            {items.length === 0 ? (
              <BasketEmptyState />
            ) : (
              <>
                {items.map((item) => (
                  <BasketItemCard
                    isFavorite={isFavorite(item.productId)}
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
                    onToggleFavorite={toggle}
                  />
                ))}

                {deliveryServices.map((service) => (
                  <DeliveryOption
                    address={deliveryAddress}
                    isSelected={selectedService?.id === service.id}
                    key={service.id}
                    service={service}
                    onAddressChange={setDeliveryAddress}
                    onSelect={(serviceId) => {
                      setSelectedServiceId(serviceId);

                      const nextService = deliveryServices.find(
                        (item) => item.id === serviceId,
                      );

                      if (nextService?.type === 'pickup') {
                        setDeliveryAddress('');
                      }
                    }}
                  />
                ))}

                <BasketSummary
                  isCheckoutDisabled={disableCheckout}
                  totalPrice={totals.grandTotal}
                  onCheckout={handleCheckout}
                />
              </>
            )}
          </div>
        </TopicSection>
      </MainWrapper>
    </div>
  );
};

export default BasketPage;
