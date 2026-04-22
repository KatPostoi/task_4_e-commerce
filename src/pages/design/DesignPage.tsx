import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { materials } from '../../modules/catalog/data/materials';
import { styles } from '../../modules/catalog/data/styles';
import { CatalogCard } from '../../modules/catalog/ui/CatalogCard';
import { useCart } from '../../modules/cart/hooks/useCart';
import { useCustomFrames } from '../../modules/constructor/hooks/useCustomFrames';
import { Header } from '../../modules/layout/ui/Header';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';
import { routePaths } from '../../shared/config/routes';
import { Button } from '../../shared/ui/Button/Button';
import { Dropdown } from '../../shared/ui/Dropdown/Dropdown';
import { LinkAsButton } from '../../shared/ui/LinkAsButton/LinkAsButton';
import { TopicSection } from '../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../shared/ui/TopicSection/TopicSectionTitle';
import { TextPosition } from '../../shared/ui/TopicSection/types';
import '../../modules/catalog/ui/catalog-section.css';
import './design-page.css';

type ConstructorOption = {
  id: string;
  label: string;
};

const parseDimensionValue = (value: string): number | null => {
  if (!value.trim()) {
    return null;
  }

  const normalizedValue = Number(value.replace(',', '.'));

  if (Number.isNaN(normalizedValue) || normalizedValue <= 0) {
    return null;
  }

  return normalizedValue;
};

const DesignPage = () => {
  const [searchParams] = useSearchParams();
  const materialOptions = useMemo<ConstructorOption[]>(() => {
    return materials.map((item) => ({
      id: item.id,
      label: item.title,
    }));
  }, []);
  const styleOptions = useMemo<ConstructorOption[]>(() => {
    return styles.map((item) => ({
      id: item.id,
      label: item.name,
    }));
  }, []);
  const initialMaterialId = searchParams.get('materialId');
  const [selectedMaterialOption, setSelectedMaterialOption] =
    useState<ConstructorOption | null>(() => {
      return (
        materialOptions.find((item) => item.id === initialMaterialId) ?? null
      );
    });
  const [selectedStyleOption, setSelectedStyleOption] =
    useState<ConstructorOption | null>(null);
  const [widthCm, setWidthCm] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { frames, createFrame } = useCustomFrames();
  const { addCustomFrame, isProductInCart, toggleCustomFrame } = useCart();

  const selectedMaterial = useMemo(() => {
    if (!selectedMaterialOption) {
      return null;
    }

    return materials.find((item) => item.id === selectedMaterialOption.id) ?? null;
  }, [selectedMaterialOption]);

  const selectedStyle = useMemo(() => {
    if (!selectedStyleOption) {
      return null;
    }

    return styles.find((item) => item.id === selectedStyleOption.id) ?? null;
  }, [selectedStyleOption]);

  const widthValue = useMemo(() => parseDimensionValue(widthCm), [widthCm]);
  const heightValue = useMemo(() => parseDimensionValue(heightCm), [heightCm]);

  const price = useMemo(() => {
    if (!selectedMaterial || !selectedStyle || widthValue == null || heightValue == null) {
      return null;
    }

    return Math.round(
      (widthValue + heightValue) *
        selectedMaterial.pricePerCm *
        selectedStyle.coefficient,
    );
  }, [heightValue, selectedMaterial, selectedStyle, widthValue]);

  const canSave = Boolean(
    selectedMaterial &&
      selectedStyle &&
      widthValue != null &&
      heightValue != null &&
      price != null,
  );

  const handleSaveToBasket = () => {
    if (
      !selectedMaterial ||
      !selectedStyle ||
      widthValue == null ||
      heightValue == null ||
      price == null
    ) {
      setFeedbackMessage(null);
      setErrorMessage('Заполните размеры, материал и стиль.');
      return;
    }

    const frame = createFrame({
      material: selectedMaterial,
      style: selectedStyle,
      widthCm: widthValue,
      heightCm: heightValue,
      note: '',
      price,
    });

    addCustomFrame(frame);
    setErrorMessage(null);
    setFeedbackMessage('Рама сохранена и добавлена в корзину.');
  };

  return (
    <div className="DesignPage">
      <MainWrapper>
        <Header />

        <div className="design-constructor-text">
          <h2 className="anonymous-pro-bold home-text-block__md ">
            Дизайн-конструктор багета позволит Вам создать свою, уникальную раму.
            После оформления заказа специалист свяжется с Вами для уточнения
            деталей, предложит возможные варианты и эскизы выполнения.
          </h2>
        </div>

        <div className="design-constructor-wrapper">
          <div className="design-constructor_block-wrapper">
            <div className="design-constructor_title">
              <h2 className="anonymous-pro-bold home-text-block__xl ">
                Дизайн-
              </h2>
              <h2 className="anonymous-pro-bold home-text-block__xl_white ">
                конструктор
              </h2>
            </div>

            <LinkAsButton href={routePaths.basket}>Открыть корзину</LinkAsButton>
          </div>

          <div className="design-constructor_block-wrapper">
            <div className="design-constructor_content-wrapper_text">
              <div className="design-constructor_content-wrapper_text_double">
                <div className="design-constructor_content-wrapper_text_single">
                  <input
                    className="anonymous-pro-bold home-text-block__md__left data-text-input"
                    max="1000"
                    min="0"
                    placeholder="Ширина (см)"
                    step="0.1"
                    type="number"
                    value={widthCm}
                    onChange={(event) => setWidthCm(event.target.value)}
                  />
                </div>

                <div className="design-constructor_content-wrapper_text_single">
                  <input
                    className="anonymous-pro-bold home-text-block__md__left data-text-input"
                    max="1000"
                    min="0"
                    placeholder="Высота (см)"
                    step="0.1"
                    type="number"
                    value={heightCm}
                    onChange={(event) => setHeightCm(event.target.value)}
                  />
                </div>
              </div>

              <Dropdown
                className="anonymous-pro-bold"
                labelClassName="anonymous-pro-bold home-text-block__md_white"
                options={materialOptions}
                selectedItem={selectedMaterialOption}
                setSelectedItem={setSelectedMaterialOption}
                title="Материал"
              />

              <Dropdown
                className="anonymous-pro-bold"
                labelClassName="anonymous-pro-bold home-text-block__md_white"
                options={styleOptions}
                selectedItem={selectedStyleOption}
                setSelectedItem={setSelectedStyleOption}
                title="Стиль"
              />
            </div>

            <div className="design-constructor_result">
              <h2 className="anonymous-pro-bold home-text-block__md__left ">
                Итого:
              </h2>
              <h2 className="anonymous-pro-bold home-text-block__md__left ">
                {price == null ? '-' : `${price.toLocaleString('ru-RU')} ₽`}
              </h2>
              {errorMessage ? (
                <p className="anonymous-pro-bold home-text-block__vsm_grey">
                  {errorMessage}
                </p>
              ) : null}
              {feedbackMessage ? (
                <p className="anonymous-pro-bold home-text-block__vsm_white">
                  {feedbackMessage}
                </p>
              ) : null}
              <Button disabled={!canSave} onClick={handleSaveToBasket}>
                Сохранить и добавить в корзину
              </Button>
            </div>
          </div>
        </div>

        <TopicSection className="catalog-section">
          <TopicSectionTitle textPosition={TextPosition.LEFT}>
            Мои рамы
          </TopicSectionTitle>
          {frames.length === 0 ? (
            <p className="anonymous-pro-bold home-text-block__vsm_grey">
              Сохранённые рамы появятся здесь после расчёта в конструкторе.
            </p>
          ) : (
            <div className="catalog-wrapper">
              {frames.map((frame) => (
                <CatalogCard
                  isFavorite={false}
                  isInBasket={isProductInCart(frame.id)}
                  item={frame}
                  key={frame.id}
                  showFavoriteButton={false}
                  onToggleBasket={() => toggleCustomFrame(frame)}
                  onToggleFavorite={() => undefined}
                />
              ))}
            </div>
          )}
        </TopicSection>
      </MainWrapper>
    </div>
  );
};

export default DesignPage;
