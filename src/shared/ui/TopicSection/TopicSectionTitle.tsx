import type { ReactNode } from 'react';
import { TextPosition } from './types';
import './topic-section-title.css';

type TopicSectionTitleProps = {
  children: ReactNode;
  textPosition?: TextPosition;
};

export const TopicSectionTitle = ({
  children,
  textPosition = TextPosition.CENTER,
}: TopicSectionTitleProps) => {
  return (
    <h2
      className={[
        'topic-section__title',
        'anonymous-pro-bold',
        'home-text-block__xl',
        `text-position-title-${textPosition}`,
      ].join(' ')}
    >
      {children}
    </h2>
  );
};
