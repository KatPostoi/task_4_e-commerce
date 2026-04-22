import { CatalogSection } from '../../modules/catalog/ui/CatalogSection';
import { Header } from '../../modules/layout/ui/Header';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';

const CatalogPage = () => {
  return (
    <div className="CatalogPage">
      <MainWrapper>
        <Header />
        <CatalogSection />
      </MainWrapper>
    </div>
  );
};

export default CatalogPage;
