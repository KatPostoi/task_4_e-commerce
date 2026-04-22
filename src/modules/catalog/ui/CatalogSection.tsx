import { useMemo, useState } from 'react';
import { catalogItems } from '../data/catalog-items';
import { materials } from '../data/materials';
import { styles } from '../data/styles';
import { useFavoriteIds } from '../hooks/useFavoriteIds';
import { useCart } from '../../cart/hooks/useCart';
import { TopicSection } from '../../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../../shared/ui/TopicSection/TopicSectionTitle';
import { CatalogCard } from './CatalogCard';
import { CatalogFilters } from './CatalogFilters';
import './catalog-section.css';

type FilterOption = {
  id: string;
  label: string;
};

const allMaterialOption: FilterOption = {
  id: '__all_materials',
  label: 'Все материалы',
};

const allStyleOption: FilterOption = {
  id: '__all_styles',
  label: 'Все стили',
};

export const CatalogSection = () => {
  const { isFavorite, toggle } = useFavoriteIds();
  const { isProductInCart, toggleCatalogItem } = useCart();
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedMaterial, setSelectedMaterial] =
    useState<FilterOption>(allMaterialOption);
  const [selectedStyle, setSelectedStyle] = useState<FilterOption>(allStyleOption);

  const materialOptions = useMemo<FilterOption[]>(() => {
    return [allMaterialOption, ...materials.map((item) => ({
      id: item.id,
      label: item.title,
    }))];
  }, []);

  const styleOptions = useMemo<FilterOption[]>(() => {
    return [allStyleOption, ...styles.map((item) => ({
      id: item.id,
      label: item.name,
    }))];
  }, []);

  const filteredItems = useMemo(() => {
    return catalogItems.filter((item) => {
      const matchesFavorites = favoritesOnly ? isFavorite(item.id) : true;
      const matchesMaterial =
        selectedMaterial.id === allMaterialOption.id
          ? true
          : item.materialId === selectedMaterial.id;
      const matchesStyle =
        selectedStyle.id === allStyleOption.id
          ? true
          : item.styleId === selectedStyle.id;

      return matchesFavorites && matchesMaterial && matchesStyle;
    });
  }, [favoritesOnly, isFavorite, selectedMaterial.id, selectedStyle.id]);

  return (
    <TopicSection className="catalog-section">
      <TopicSectionTitle>Каталог</TopicSectionTitle>

      <CatalogFilters
        favoritesOnly={favoritesOnly}
        materialOptions={materialOptions}
        onFavoritesToggle={() => setFavoritesOnly((currentValue) => !currentValue)}
        onMaterialSelect={setSelectedMaterial}
        onStyleSelect={setSelectedStyle}
        selectedMaterial={selectedMaterial}
        selectedStyle={selectedStyle}
        styleOptions={styleOptions}
      />

      {filteredItems.length === 0 ? (
        <p className="catalog-section__empty-message anonymous-pro-bold home-text-block__md__left">
          Нет товаров, удовлетворяющих условиям фильтра.
        </p>
      ) : (
        <div className="catalog-wrapper">
          {filteredItems.map((item) => (
            <CatalogCard
              isFavorite={isFavorite(item.id)}
              isInBasket={isProductInCart(item.id)}
              item={item}
              key={item.id}
              onToggleBasket={() => toggleCatalogItem(item)}
              onToggleFavorite={() => toggle(item.id)}
            />
          ))}
        </div>
      )}
    </TopicSection>
  );
};
