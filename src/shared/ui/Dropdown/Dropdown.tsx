import { useEffect, useRef, useState } from 'react';
import './dropdown.css';

type DropdownOptionObject = {
  id: string | number;
  label: string;
};

export type DropdownOption = string | DropdownOptionObject;

type DropdownProps<TOption extends DropdownOption> = {
  title: string;
  options: TOption[];
  selectedItem?: TOption | null;
  setSelectedItem: (value: TOption) => void;
  className?: string;
  labelClassName?: string;
  variant?: 'line' | 'circle';
  fullWidth?: boolean;
};

const isOptionObject = (option: DropdownOption): option is DropdownOptionObject => {
  return typeof option === 'object' && option !== null;
};

const getOptionLabel = (option: DropdownOption) => {
  return isOptionObject(option) ? option.label : option;
};

const getOptionKey = (option: DropdownOption) => {
  return isOptionObject(option) ? option.id : option;
};

const isOptionSelected = (
  option: DropdownOption,
  selectedItem?: DropdownOption | null,
) => {
  if (!selectedItem) {
    return false;
  }

  if (typeof option === 'string' && typeof selectedItem === 'string') {
    return option === selectedItem;
  }

  if (isOptionObject(option) && isOptionObject(selectedItem)) {
    return option.id === selectedItem.id;
  }

  return false;
};

export const Dropdown = <TOption extends DropdownOption>({
  title,
  options,
  selectedItem,
  setSelectedItem,
  className,
  labelClassName,
  variant = 'line',
  fullWidth = true,
}: DropdownProps<TOption>) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const controlClassName = [
    'ui-dropdown__control',
    variant === 'circle'
      ? 'ui-dropdown__control_circle'
      : 'ui-dropdown__control_line',
  ].join(' ');

  const containerClassName = [
    'ui-dropdown',
    fullWidth ? 'ui-dropdown_full-width' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const label = selectedItem != null ? getOptionLabel(selectedItem) : title;

  return (
    <div className={containerClassName} ref={containerRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={controlClassName}
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span
          className={['ui-dropdown__label', labelClassName ?? '']
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </span>
        <span
          aria-hidden="true"
          className={[
            'ui-dropdown__chevron',
            isOpen ? 'ui-dropdown__chevron_open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      </button>

      {isOpen && options.length > 0 ? (
        <ul className="ui-dropdown__list" role="listbox">
          {options.map((option) => (
            <li key={getOptionKey(option)}>
              <button
                className={[
                  'ui-dropdown__option',
                  isOptionSelected(option, selectedItem)
                    ? 'ui-dropdown__option_selected'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                type="button"
                onClick={() => {
                  setSelectedItem(option);
                  setIsOpen(false);
                }}
              >
                {getOptionLabel(option)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
