import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode;
  className?: string;
  loading?: boolean;
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  type = 'button',
  ...restProps
}: ButtonProps) => {
  return (
    <button
      {...restProps}
      aria-busy={loading || undefined}
      className={[
        'ui-button',
        `ui-button_variant_${variant}`,
        `ui-button_size_${size}`,
        fullWidth ? 'ui-button_full-width' : '',
        loading ? 'ui-button_loading' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || loading}
      type={type}
    >
      <span className="ui-button__label">{children}</span>
      {loading ? (
        <span aria-hidden="true" className="ui-button__icon">
          <span className="ui-button__spinner" />
        </span>
      ) : null}
    </button>
  );
};
