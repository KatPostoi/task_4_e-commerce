import type { MaterialOption, StyleOption } from '../../catalog/lib/catalog-options';
import { formatCurrency } from '../../../shared/lib/currency';
import { Button } from '../../../shared/ui/Button/Button';
import { Dropdown } from '../../../shared/ui/Dropdown/Dropdown';
import './constructor-form.css';

export type ConstructorFormMessage = {
  text: string;
  tone: 'error' | 'success';
};

type ConstructorFormProps = {
  materialOptions: MaterialOption[];
  selectedMaterial: MaterialOption | null;
  onMaterialSelect: (option: MaterialOption) => void;
  styleOptions: StyleOption[];
  selectedStyle: StyleOption | null;
  onStyleSelect: (option: StyleOption) => void;
  widthInput: string;
  heightInput: string;
  onWidthInputChange: (value: string) => void;
  onHeightInputChange: (value: string) => void;
  price: number | null;
  canSave: boolean;
  statusMessage?: ConstructorFormMessage | null;
  onSubmit: () => void;
};

export const ConstructorForm = ({
  materialOptions,
  selectedMaterial,
  onMaterialSelect,
  styleOptions,
  selectedStyle,
  onStyleSelect,
  widthInput,
  heightInput,
  onWidthInputChange,
  onHeightInputChange,
  price,
  canSave,
  statusMessage,
  onSubmit,
}: ConstructorFormProps) => {
  return (
    <div className="design-constructor-wrapper">
      <div className="design-constructor_block-wrapper">
        <div className="design-constructor_title">
          <h2 className="anonymous-pro-bold home-text-block__xl ">Дизайн-</h2>
          <h2 className="anonymous-pro-bold home-text-block__xl_white ">конструктор</h2>
        </div>
      </div>

      <form
        className="design-constructor_block-wrapper"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="design-constructor_content-wrapper_text">
          <div className="design-constructor_content-wrapper_text_double">
            <div className="design-constructor_content-wrapper_text_single">
              <input
                aria-label="Ширина в сантиметрах"
                autoComplete="off"
                className="anonymous-pro-bold home-text-block__md__left data-text-input"
                inputMode="decimal"
                placeholder="Ширина (см)"
                type="text"
                value={widthInput}
                onChange={(event) => onWidthInputChange(event.target.value)}
              />
            </div>

            <div className="design-constructor_content-wrapper_text_single">
              <input
                aria-label="Высота в сантиметрах"
                autoComplete="off"
                className="anonymous-pro-bold home-text-block__md__left data-text-input"
                inputMode="decimal"
                placeholder="Высота (см)"
                type="text"
                value={heightInput}
                onChange={(event) => onHeightInputChange(event.target.value)}
              />
            </div>
          </div>

          <Dropdown
            className="anonymous-pro-bold"
            labelClassName="anonymous-pro-bold home-text-block__md_white"
            options={materialOptions}
            selectedItem={selectedMaterial}
            setSelectedItem={onMaterialSelect}
            title="Материал"
          />

          <Dropdown
            className="anonymous-pro-bold"
            labelClassName="anonymous-pro-bold home-text-block__md_white"
            options={styleOptions}
            selectedItem={selectedStyle}
            setSelectedItem={onStyleSelect}
            title="Стиль"
          />
        </div>

        <div className="design-constructor_result">
          <h2 className="anonymous-pro-bold home-text-block__md__left ">Итого:</h2>
          <h2 className="anonymous-pro-bold home-text-block__md__left ">
            {price === null ? '-' : formatCurrency(price)}
          </h2>

          {statusMessage ? (
            <p
              className={[
                'constructor-form__message',
                statusMessage.tone === 'error'
                  ? 'constructor-form__message_error'
                  : 'constructor-form__message_success',
                'anonymous-pro-bold',
                statusMessage.tone === 'error' ? 'home-text-block__vsm_grey' : 'home-text-block__vsm_white',
              ].join(' ')}
            >
              {statusMessage.text}
            </p>
          ) : null}

          <Button disabled={!canSave} type="submit">
            Сохранить и добавить в корзину
          </Button>
        </div>
      </form>
    </div>
  );
};
