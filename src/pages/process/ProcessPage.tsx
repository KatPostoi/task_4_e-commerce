import { Header } from '../../modules/layout/ui/Header';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';
import { MaterialsSection } from '../../modules/catalog/ui/MaterialsSection';
import { materials } from '../../modules/catalog/data/materials';
import { processPageContent } from '../../modules/content/data/process-content';
import { ProductionSection } from '../../modules/content/ui/ProductionSection';

const ProcessPage = () => {
  return (
    <div className="ProcessPage">
      <MainWrapper>
        <Header />
        <ProductionSection items={processPageContent.steps} title="Процесс изготовления" />
        <MaterialsSection items={materials} />
      </MainWrapper>
    </div>
  );
};

export default ProcessPage;
