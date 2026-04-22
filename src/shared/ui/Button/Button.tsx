import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import './button.css';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

type CommonButtonProps = {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

type NativeButtonProps = CommonButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> & {
    href?: never;
    to?: never;
  };

type RouterButtonProps = CommonButtonProps &
  Omit<LinkProps, 'className' | 'to'> & {
    href?: never;
    to: LinkProps['to'];
  };

type AnchorButtonProps = CommonButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'href'> & {
    href: string;
    to?: never;
  };

export type ButtonProps =
  | NativeButtonProps
  | RouterButtonProps
  | AnchorButtonProps;

const isRouterButton = (props: ButtonProps): props is RouterButtonProps => {
  return 'to' in props;
};

const isAnchorButton = (props: ButtonProps): props is AnchorButtonProps => {
  return 'href' in props;
};

const getButtonClassName = ({
  className,
  fullWidth,
  size = 'md',
  variant = 'primary',
}: Pick<ButtonProps, 'className' | 'fullWidth' | 'size' | 'variant'>) => {
  return [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
};

export const Button = (props: ButtonProps) => {
  const className = getButtonClassName(props);

  if (isRouterButton(props)) {
    const {
      children,
      className: ignoredClassName,
      fullWidth: ignoredFullWidth,
      size: ignoredSize,
      variant: ignoredVariant,
      ...linkProps
    } = props;

    void ignoredClassName;
    void ignoredFullWidth;
    void ignoredSize;
    void ignoredVariant;

    return (
      <Link className={className} {...linkProps}>
        {children}
      </Link>
    );
  }

  if (isAnchorButton(props)) {
    const {
      children,
      className: ignoredClassName,
      fullWidth: ignoredFullWidth,
      size: ignoredSize,
      variant: ignoredVariant,
      rel,
      target,
      ...anchorProps
    } = props;
    const isExternal = target === '_blank';

    void ignoredClassName;
    void ignoredFullWidth;
    void ignoredSize;
    void ignoredVariant;

    return (
      <a
        className={className}
        rel={rel ?? (isExternal ? 'noreferrer noopener' : undefined)}
        target={target}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const {
    children,
    className: ignoredClassName,
    fullWidth: ignoredFullWidth,
    size: ignoredSize,
    variant: ignoredVariant,
    type = 'button',
    ...buttonProps
  } = props;

  void ignoredClassName;
  void ignoredFullWidth;
  void ignoredSize;
  void ignoredVariant;

  return (
    <button className={className} type={type} {...buttonProps}>
      {children}
    </button>
  );
};
