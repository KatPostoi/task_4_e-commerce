import { PageStub } from '../../shared/ui/page-stub/PageStub';
import { routePaths } from '../../shared/config/routes';

const CatalogPage = () => {
  return (
    <PageStub
      action={{ label: 'Создать свой дизайн', to: routePaths.design }}
      eyebrow="Каталог"
      title="Каталог"
      summary="Каталог уже получил своё место в новой дизайн-системе: дальше сюда можно спокойно добавить фильтры, карточки и cart-интеграцию без переделки shell."
      checklist={[
        'Маршрут отделён от конструктора и корзины.',
        'Каталог ещё не зависит от API, auth или глобальных context.',
        'Данные и фильтрация будут добавлены следующим доменным шагом поверх уже готовых shared UI и tokens.',
      ]}
    />
  );
};

export default CatalogPage;
