import { PageStub } from '../../shared/ui/page-stub/PageStub';
import { routePaths } from '../../shared/config/routes';

const DesignPage = () => {
  return (
    <PageStub
      action={{ label: 'Открыть корзину', to: routePaths.basket }}
      eyebrow="Конструктор"
      title="Конструктор"
      summary="Конструктор уже живёт как отдельная публичная зона продукта. Теперь можно без лишней архитектурной грязи добавить форму, расчёт цены и локальное сохранение рам."
      checklist={[
        'Доступ открыт любому посетителю без login flow.',
        'Сейчас нет ни формы, ни бизнес-логики расчёта.',
        'Страница уже встроена в общий public route tree и использует общий каркас без auth-зависимостей.',
      ]}
    />
  );
};

export default DesignPage;
