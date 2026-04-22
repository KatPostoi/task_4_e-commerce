import type { Material } from '../model/catalog-types';
import { routePaths } from '../../../shared/config/routes';
import { Button } from '../../../shared/ui/Button/Button';
import './material-card.css';

type MaterialCardProps = {
  item: Material;
};

export const MaterialCard = ({ item }: MaterialCardProps) => {
  return (
    <article className="material-card">
      <div className="material-card__media">
        <img
          alt={item.image.alt}
          className="material-card__image"
          src={item.image.src}
        />
      </div>

      <div className="material-card__body">
        <div className="material-card__meta">
          <span
            aria-hidden="true"
            className="material-card__swatch"
            style={{ backgroundColor: item.swatchHex }}
          />
          <span className="material-card__price">{item.pricePerCm} ₽ / см</span>
        </div>

        <div className="material-card__copy">
          <h3 className="material-card__title">{item.title}</h3>
          <p className="material-card__lead">{item.shortDescription}</p>
          <p className="material-card__description">{item.description}</p>
        </div>

        <ul className="material-card__highlights" role="list">
          {item.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>

        <Button
          fullWidth
          to={`${routePaths.design}?materialId=${encodeURIComponent(item.id)}`}
          variant="secondary"
        >
          Создать свой дизайн
        </Button>
      </div>
    </article>
  );
};
