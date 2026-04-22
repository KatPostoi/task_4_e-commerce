import { PageStub } from '../../shared/ui/page-stub/PageStub';
import { routePaths } from '../../shared/config/routes';

const BasketPage = () => {
  return (
    <PageStub
      action={{ label: 'Вернуться в каталог', to: routePaths.catalog }}
      eyebrow="Корзина"
      title="Корзина"
      summary="Корзина уже вписана в новый product shell как полноценная публичная страница. Дальше сюда добавим локальные позиции, totals и checkout flow поверх storage foundation."
      checklist={[
        'Маршрут не защищён и не зависит от профиля пользователя.',
        'Пока корзина не хранит состояние и не считает totals.',
        'Финальная логика будет построена поверх локального storage, а не backend API.',
      ]}
    />
  );
};

export default BasketPage;
