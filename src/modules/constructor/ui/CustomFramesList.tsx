import type { CustomFrame } from '../model/constructor-types';
import { formatCurrency } from '../../../shared/lib/currency';
import { ButtonBasket } from '../../../shared/ui/ButtonBasket/ButtonBasket';
import { TopicSection } from '../../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../../shared/ui/TopicSection/TopicSectionTitle';
import { TextPosition } from '../../../shared/ui/TopicSection/types';
import './custom-frames-list.css';

type CustomFramesListProps = {
  frames: CustomFrame[];
  emptyMessage?: string;
  isInCart: (frameId: string) => boolean;
  onToggleCart: (frame: CustomFrame) => void;
};

const formatDimensions = (frame: CustomFrame) => {
  return `${frame.size.widthCm}×${frame.size.heightCm} см`;
};

export const CustomFramesList = ({
  frames,
  emptyMessage = 'Сохранённые рамы появятся здесь после расчёта в конструкторе.',
  isInCart,
  onToggleCart,
}: CustomFramesListProps) => {
  return (
    <TopicSection className="custom-frames-list">
      <TopicSectionTitle textPosition={TextPosition.LEFT}>
        Мои рамы
      </TopicSectionTitle>

      {frames.length === 0 ? (
        <p className="custom-frames-list__empty anonymous-pro-bold home-text-block__md__left">
          {emptyMessage}
        </p>
      ) : (
        <div className="custom-frames-list__grid">
          {frames.map((frame) => (
            <article className="custom-frame-card" key={frame.id}>
              <div className="custom-frame-card__media">
                <img alt={frame.image.alt} src={frame.image.src} />
              </div>

              <div className="custom-frame-card__header">
                <div className="custom-frame-card__titles">
                  <h3 className="anonymous-pro-bold home-text-block__sm">
                    {frame.title}
                  </h3>
                  <p className="anonymous-pro-bold home-text-block__vsm_white">
                    {frame.description}
                  </p>
                </div>

                <ButtonBasket
                  active={isInCart(frame.id)}
                  ariaLabel={
                    isInCart(frame.id)
                      ? `Убрать раму ${frame.title} из корзины`
                      : `Добавить раму ${frame.title} в корзину`
                  }
                  onClick={() => onToggleCart(frame)}
                />
              </div>

              <div className="custom-frame-card__specs">
                <div className="custom-frame-card__spec">
                  <span className="anonymous-pro-bold home-text-block__vsm_white">
                    Размер
                  </span>
                  <span className="anonymous-pro-bold home-text-block__sm">
                    {formatDimensions(frame)}
                  </span>
                </div>

                <div className="custom-frame-card__spec">
                  <span className="anonymous-pro-bold home-text-block__vsm_white">
                    Материал и стиль
                  </span>
                  <span className="anonymous-pro-bold home-text-block__sm">
                    {frame.material.title} / {frame.style.name}
                  </span>
                </div>

                <div className="custom-frame-card__spec">
                  <span className="anonymous-pro-bold home-text-block__vsm_white">
                    Стоимость
                  </span>
                  <span className="anonymous-pro-bold home-text-block__sm">
                    {formatCurrency(frame.price)}
                  </span>
                </div>

                {frame.note ? (
                  <div className="custom-frame-card__spec">
                    <span className="anonymous-pro-bold home-text-block__vsm_white">
                      Комментарий
                    </span>
                    <span className="anonymous-pro-bold home-text-block__sm">
                      {frame.note}
                    </span>
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </TopicSection>
  );
};
