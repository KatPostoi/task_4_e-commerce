import { useMemo, useState } from 'react';
import { catalogItems } from '../data/catalog-items';
import { materials } from '../data/materials';
import { styles } from '../data/styles';
import {
  buildMaterialOptions,
  buildStyleOptions,
  type MaterialOption,
  type StyleOption,
} from '../lib/catalog-options';
import { useCart } from '../../cart/model/use-cart';
import { TopicSection } from '../../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../../shared/ui/TopicSection/TopicSectionTitle';
import { CatalogCard } from './CatalogCard';
import { CatalogFilters } from './CatalogFilters';
import { CatalogGrid } from './CatalogGrid';
import { ButtonBasket } from '../../../shared/ui/ButtonBasket/ButtonBasket';
import { filterCatalog } from '../lib/filter-catalog';
import './catalog-section.css';

const ALL_MATERIAL_OPTION: MaterialOption = {
  id: 0,
  label: 'Все материалы',
  pricePerCm: 0,
};

const ALL_STYLE_OPTION: StyleOption = {
  id: '__all_styles',
  label: 'Все стили',
  coefficient: 0,
};

export const CatalogSection = () => {
  const { isProductInCart, toggleCatalogItem } = useCart();
  const [materialFilterId, setMaterialFilterId] = useState<number | null>(null);
  const [styleFilterId, setStyleFilterId] = useState<string | null>(null);

  const materialOptions = useMemo<MaterialOption[]>(() => {
    return [ALL_MATERIAL_OPTION, ...buildMaterialOptions(materials)];
  }, []);

  const styleOptions = useMemo<StyleOption[]>(() => {
    return [ALL_STYLE_OPTION, ...buildStyleOptions(styles)];
  }, []);

  const selectedMaterial = useMemo(
    () =>
      materialOptions.find((option) => option.id === materialFilterId) ??
      ALL_MATERIAL_OPTION,
    [materialFilterId, materialOptions],
  );

  const selectedStyle = useMemo(
    () =>
      styleOptions.find((option) => option.id === styleFilterId) ??
      ALL_STYLE_OPTION,
    [styleFilterId, styleOptions],
  );

  const filteredItems = useMemo(() => {
    return filterCatalog(catalogItems, {
      materialId:
        selectedMaterial.id === ALL_MATERIAL_OPTION.id ? null : selectedMaterial.id,
      styleId: selectedStyle.id === ALL_STYLE_OPTION.id ? null : selectedStyle.id,
    });
  }, [selectedMaterial.id, selectedStyle.id]);

  const handleMaterialSelect = (option: MaterialOption) => {
    setMaterialFilterId(option.id === ALL_MATERIAL_OPTION.id ? null : option.id);
  };

  const handleStyleSelect = (option: StyleOption) => {
    setStyleFilterId(option.id === ALL_STYLE_OPTION.id ? null : option.id);
  };

  return (
    <TopicSection className="catalog-section">
      <TopicSectionTitle>Каталог</TopicSectionTitle>

      <CatalogFilters
        materialOptions={materialOptions}
        onMaterialSelect={handleMaterialSelect}
        onStyleSelect={handleStyleSelect}
        selectedMaterial={selectedMaterial}
        selectedStyle={selectedStyle}
        styleOptions={styleOptions}
      />

      <CatalogGrid
        emptyMessage="Нет товаров, удовлетворяющих условиям фильтра."
        isEmpty={filteredItems.length === 0}
      >
        {filteredItems.map((item) => (
          <CatalogCard
            actionSlot={
              <ButtonBasket
                active={isProductInCart(item.id)}
                ariaLabel={
                  isProductInCart(item.id)
                    ? `Убрать ${item.title} из корзины`
                    : `Добавить ${item.title} в корзину`
                }
                onClick={() => toggleCatalogItem(item)}
              />
            }
            item={item}
            key={item.id}
          />
        ))}
      </CatalogGrid>
    </TopicSection>
  );
};
