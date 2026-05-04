import type { ReactNode } from 'react';
import './catalog-grid.css';

type CatalogGridProps = {
  children: ReactNode;
  emptyMessage: string;
  isEmpty: boolean;
};

export const CatalogGrid = ({
  children,
  emptyMessage,
  isEmpty,
}: CatalogGridProps) => {
  if (isEmpty) {
    return (
      <p className="catalog-section__empty-message anonymous-pro-bold home-text-block__md__left">
        {emptyMessage}
      </p>
    );
  }

  return <div className="catalog-wrapper">{children}</div>;
};
