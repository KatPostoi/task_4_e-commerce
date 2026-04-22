import type { ProductionStep } from '../data/process-content';

type ProductionCardProps = {
  index: number;
  step: ProductionStep;
};

export const ProductionCard = ({ index, step }: ProductionCardProps) => {
  return (
    <article className="production-card">
      <div className="production-card__number">{index + 1}</div>
      <div className="production-card__body">
        <h3 className="production-card__title">{step.title}</h3>
        <p className="production-card__description">{step.description}</p>
        <p className="production-card__details">{step.details}</p>
      </div>
    </article>
  );
};
