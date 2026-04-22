import { useState } from 'react';
import halfFrameImg from '../../../shared/assets/images/half_frame.png';
import type { ProductionStep } from '../data/process-content';
import { TopicSection } from '../../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../../shared/ui/TopicSection/TopicSectionTitle';
import { ProductionCard } from './ProductionCard';
import './production-section.css';

type ProductionSectionProps = {
  title: string;
  items: readonly ProductionStep[];
};

export const ProductionSection = ({ title, items }: ProductionSectionProps) => {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id ?? null);

  const handleToggle = (id: string) => {
    setExpandedId((current) => (current === id ? current : id));
  };

  return (
    <TopicSection className="process-section">
      <TopicSectionTitle>{title}</TopicSectionTitle>
      <div className="production-section__grid">
        <div className="process-section_cards-wrapper">
          <div className="process-section_card">
            {items.map((step, index) => (
              <ProductionCard
                index={index}
                isExpanded={expandedId === step.id}
                key={step.id}
                onToggle={() => handleToggle(step.id)}
                step={step}
              />
            ))}
          </div>
          <div className="process-section_card process-section_card-image">
            <img alt="ProcessSectionImage" className="process-section_image" src={halfFrameImg} />
          </div>
        </div>
      </div>
    </TopicSection>
  );
};
