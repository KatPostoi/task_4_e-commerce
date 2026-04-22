import { Button } from '../Button/Button';
import { Section } from '../Section/Section';
import { PageHeader } from '../../../modules/layout/ui/PageHeader';
import './page-stub.css';

type PageStubAction = {
  label: string;
  to: string;
};

type PageStubProps = {
  eyebrow: string;
  title: string;
  summary: string;
  checklist: readonly string[];
  action?: PageStubAction;
};

export const PageStub = ({
  eyebrow,
  title,
  summary,
  checklist,
  action,
}: PageStubProps) => {
  return (
    <div className="page-stub">
      <PageHeader
        actions={
          action ? <Button to={action.to}>{action.label}</Button> : undefined
        }
        aside={
          <div className="page-stub__status">
            <p className="page-stub__status-label">Статус шага</p>
            <h2 className="page-stub__status-title">Дизайн-основа подключена</h2>
            <p className="page-stub__status-text">
              Страница уже живёт внутри нового `AppShell`, использует общие
              surface-компоненты и готова к следующему доменному шагу.
            </p>
          </div>
        }
        description={summary}
        eyebrow={eyebrow}
        title={title}
      />

      <Section
        description="На этом этапе мы сознательно не переносим бизнес-логику, но уже фиксируем правильную композицию, навигацию и reusable UI."
        eyebrow="Foundation"
        title="Что уже зафиксировано"
        tone="default"
      >
        <ul className="page-stub__list">
          {checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
};
