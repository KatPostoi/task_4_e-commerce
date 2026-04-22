import type { KeyboardEvent } from 'react';
import type { ProductionStep } from '../data/process-content';

type ProductionCardProps = {
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  step: ProductionStep;
};

export const ProductionCard = ({ index, isExpanded, onToggle, step }: ProductionCardProps) => {
  const isInteractive = !isExpanded;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <article
      className={['process-section_card-facts', !isExpanded ? 'process-section_card-facts_collapsed' : '']
        .filter(Boolean)
        .join(' ')}
      aria-disabled={!isInteractive}
      aria-expanded={isExpanded}
      aria-label={`Подробнее о шаге ${index + 1}`}
      onClick={isInteractive ? onToggle : undefined}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
    >
      <div className="process-section_card-facts__text">
        {isExpanded ? (
          <h2 className="anonymous-pro-bold home-text-block__sm_white process-section_card-facts__text-description_active">
            {`${step.description}`}
          </h2>
        ) : null}
        <h2
          className={[
            'anonymous-pro-bold',
            'home-text-block__sm_white',
            isExpanded ? 'process-section_card-facts__text-title_active' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {step.title}
        </h2>
      </div>
      <div
        className={['process-section_card-number', isExpanded ? 'process-section_card-number_active' : '']
          .filter(Boolean)
          .join(' ')}
      >
        <h2 className="anonymous-pro-bold home-text-block__md">{`0${index + 1}`}</h2>
      </div>
    </article>
  );
};
