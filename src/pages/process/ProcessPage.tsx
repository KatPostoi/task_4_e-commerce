import { PageHeader } from '../../modules/layout/ui/PageHeader';
import { processPageContent } from '../../modules/content/data/process-content';
import { ProductionSection } from '../../modules/content/ui/ProductionSection';
import { materials } from '../../modules/catalog/data/materials';
import { MaterialCard } from '../../modules/catalog/ui/MaterialCard';
import { Section } from '../../shared/ui/Section/Section';
import { Button } from '../../shared/ui/Button/Button';
import { routePaths } from '../../shared/config/routes';
import './process-page.css';

const ProcessPage = () => {
  return (
    <div className="process-page">
      <PageHeader
        actions={
          <Button to={routePaths.design}>Перейти в конструктор</Button>
        }
        aside={
          <div className="process-page__summary-card">
            <span className="process-page__summary-number">
              {processPageContent.steps.length}
            </span>
            <p className="process-page__summary-text">
              шага от подбора багета до выдачи или доставки
            </p>
          </div>
        }
        description={processPageContent.summary}
        eyebrow={processPageContent.eyebrow}
        title={processPageContent.title}
      />

      <ProductionSection
        description={processPageContent.stepsDescription}
        eyebrow={processPageContent.stepsEyebrow}
        items={processPageContent.steps}
        title={processPageContent.stepsTitle}
      />

      <Section
        className="process-page__materials-section"
        description={processPageContent.materialsDescription}
        eyebrow={processPageContent.materialsEyebrow}
        title={processPageContent.materialsTitle}
        actions={
          <Button to={routePaths.catalog} variant="secondary">
            Открыть каталог
          </Button>
        }
      >
        <div className="process-page__materials-grid">
          {materials.map((material) => (
            <MaterialCard item={material} key={material.id} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default ProcessPage;
