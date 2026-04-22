import type { ChangeEventHandler } from 'react';
import './dropdown.css';

export type DropdownOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type DropdownProps = {
  id?: string;
  label: string;
  name?: string;
  value: string;
  options: readonly DropdownOption[];
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

export const Dropdown = ({
  id,
  label,
  name,
  value,
  options,
  placeholder,
  hint,
  disabled = false,
  onChange,
}: DropdownProps) => {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onChange(event.target.value);
  };

  return (
    <label className="dropdown" htmlFor={id}>
      <span className="dropdown__label">{label}</span>
      <span className="dropdown__field">
        <select
          className="dropdown__select"
          disabled={disabled}
          id={id}
          name={name}
          onChange={handleChange}
          value={value}
        >
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((option) => (
            <option
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </span>
      {hint ? <span className="dropdown__hint">{hint}</span> : null}
    </label>
  );
};
