import type { ProductionStep } from '../data/process-content';
import { Section } from '../../../shared/ui/Section/Section';
import { ProductionCard } from './ProductionCard';
import './production-section.css';

type ProductionSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: readonly ProductionStep[];
};

export const ProductionSection = ({
  eyebrow,
  title,
  description,
  items,
}: ProductionSectionProps) => {
  return (
    <Section
      className="production-section"
      description={description}
      eyebrow={eyebrow}
      title={title}
      tone="contrast"
    >
      <div className="production-section__grid">
        {items.map((step, index) => (
          <ProductionCard index={index} key={step.id} step={step} />
        ))}
      </div>
    </Section>
  );
};
