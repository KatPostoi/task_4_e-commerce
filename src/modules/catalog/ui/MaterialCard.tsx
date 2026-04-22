import type { Material } from '../model/catalog-types';
import { routePaths } from '../../../shared/config/routes';
import { LinkAsButton } from '../../../shared/ui/LinkAsButton/LinkAsButton';
import './material-card.css';

type MaterialCardProps = {
  item: Material;
};

export const MaterialCard = ({ item }: MaterialCardProps) => {
  return (
    <div className="materials-card">
      <div className="anonymous-pro-bold home-text-block__md__left">
        {item.title}
      </div>

      <div className="materials-card__content">
        <div className="anonymous-pro-bold home-text-block__sm_white">
          {item.description}
        </div>
        <img
          alt={item.image.alt}
          className="materials-card__image"
          src={item.image.src}
        />
      </div>
      <div className="button-position-wrapper">
        <LinkAsButton
          className="materials-card__cta"
          href={`${routePaths.design}?materialId=${encodeURIComponent(item.id.toString())}`}
          variant="secondary"
        >
          Создать свой дизайн
        </LinkAsButton>
      </div>
    </div>
  );
};
