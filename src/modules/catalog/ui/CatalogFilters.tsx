import { Dropdown } from '../../../shared/ui/Dropdown/Dropdown';
import './catalog-filters.css';

type FilterOption = {
  id: string;
  label: string;
};

type CatalogFiltersProps = {
  favoritesOnly: boolean;
  onFavoritesToggle: () => void;
  materialOptions: FilterOption[];
  selectedMaterial: FilterOption;
  onMaterialSelect: (option: FilterOption) => void;
  styleOptions: FilterOption[];
  selectedStyle: FilterOption;
  onStyleSelect: (option: FilterOption) => void;
};

export const CatalogFilters = ({
  favoritesOnly,
  onFavoritesToggle,
  materialOptions,
  selectedMaterial,
  onMaterialSelect,
  styleOptions,
  selectedStyle,
  onStyleSelect,
}: CatalogFiltersProps) => {
  return (
    <div className="catalog-filters">
      <button
        className={[
          'catalog-filters__favorites-button',
          'nav-menu__item',
          'anonymous-pro-bold',
          favoritesOnly ? 'nav-menu__item_active' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        type="button"
        onClick={onFavoritesToggle}
      >
        Избранное
      </button>

      <Dropdown
        className="catalog-filters__dropdown"
        fullWidth={false}
        labelClassName="anonymous-pro-bold home-text-block__md__left"
        options={materialOptions}
        selectedItem={selectedMaterial}
        setSelectedItem={onMaterialSelect}
        title="Материал"
        variant="circle"
      />

      <Dropdown
        className="catalog-filters__dropdown"
        fullWidth={false}
        labelClassName="anonymous-pro-bold home-text-block__md__left"
        options={styleOptions}
        selectedItem={selectedStyle}
        setSelectedItem={onStyleSelect}
        title="Стиль"
        variant="circle"
      />
    </div>
  );
};
