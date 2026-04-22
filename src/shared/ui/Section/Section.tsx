import type { HTMLAttributes, ReactNode } from 'react';
import './section.css';

type SectionTone = 'default' | 'muted' | 'contrast';

type SectionProps = {
  as?: 'section' | 'div';
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>;

export const Section = ({
  as = 'section',
  eyebrow,
  title,
  description,
  actions,
  children,
  className,
  tone = 'default',
  ...restProps
}: SectionProps) => {
  const Component = as;

  return (
    <Component
      className={['section', `section--${tone}`, className ?? '']
        .filter(Boolean)
        .join(' ')}
      {...restProps}
    >
      {eyebrow || title || description || actions ? (
        <div className="section__header">
          <div className="section__copy">
            {eyebrow ? <p className="section__eyebrow">{eyebrow}</p> : null}
            {title ? <h2 className="section__title">{title}</h2> : null}
            {description ? (
              <p className="section__description">{description}</p>
            ) : null}
          </div>
          {actions ? <div className="section__actions">{actions}</div> : null}
        </div>
      ) : null}
      <div className="section__body">{children}</div>
    </Component>
  );
};
