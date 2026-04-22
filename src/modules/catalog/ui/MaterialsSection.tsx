import type { Material } from '../model/catalog-types';
import { TopicSection } from '../../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../../shared/ui/TopicSection/TopicSectionTitle';
import { MaterialCard } from './MaterialCard';
import './materials-section.css';

type MaterialsSectionProps = {
  items: Material[];
};

export const MaterialsSection = ({ items }: MaterialsSectionProps) => {
  return (
    <TopicSection className="materials-section">
      <TopicSectionTitle>Материалы</TopicSectionTitle>
      <div className="materials-section__cards-wrapper">
        {items.map((item) => (
          <MaterialCard item={item} key={item.id} />
        ))}
      </div>
    </TopicSection>
  );
};
