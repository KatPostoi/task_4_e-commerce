import type { ReactNode } from 'react';
import { formatCurrency } from '../../../shared/lib/currency';
import './catalog-card.css';

export type CatalogCardItem = {
  id: string;
  title: string;
  price: number;
  image: {
    src: string;
    alt: string;
  };
};

type CatalogCardProps = {
  item: CatalogCardItem;
  actionSlot: ReactNode;
};

export const CatalogCard = ({ item, actionSlot }: CatalogCardProps) => {
  return (
    <div className="catalog-wrapper_card">
      <div className="catalog-wrapper_card_goods-image">
        <img alt={item.image.alt} src={item.image.src} />
      </div>
      <div className="catalog-wrapper_card_description">
        <div className="catalog-wrapper_card_description_text">
          <h2 className="anonymous-pro-bold home-text-block__sm">{item.title}</h2>
          <h2 className="anonymous-pro-bold home-text-block__vsm_white">
            {formatCurrency(item.price)}
          </h2>
        </div>
        {actionSlot}
      </div>
    </div>
  );
};
