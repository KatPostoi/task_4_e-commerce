import type {
  MaterialOption,
  StyleOption,
} from '../lib/catalog-options';
import { Dropdown } from '../../../shared/ui/Dropdown/Dropdown';
import './catalog-filters.css';

type CatalogFiltersProps = {
  materialOptions: MaterialOption[];
  selectedMaterial: MaterialOption;
  onMaterialSelect: (option: MaterialOption) => void;
  styleOptions: StyleOption[];
  selectedStyle: StyleOption;
  onStyleSelect: (option: StyleOption) => void;
};

export const CatalogFilters = ({
  materialOptions,
  selectedMaterial,
  onMaterialSelect,
  styleOptions,
  selectedStyle,
  onStyleSelect,
}: CatalogFiltersProps) => {
  return (
    <div className="catalog-filters">
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
