import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './link-as-button.css';

type LinkAsButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

const isInternalHref = (href: string) => href.startsWith('/');

export const LinkAsButton = ({
  children,
  className,
  variant = 'primary',
  target,
  rel,
  href,
  ...restProps
}: LinkAsButtonProps) => {
  const resolvedClassName = [
    'link-as-button',
    `link-as-button_${variant}`,
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (isInternalHref(href) && target !== '_blank') {
    return (
      <Link className={resolvedClassName} to={href} {...restProps}>
        {children}
      </Link>
    );
  }

  const computedRel =
    target === '_blank'
      ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ')
      : rel;

  return (
    <a
      className={resolvedClassName}
      href={href}
      rel={computedRel || undefined}
      target={target}
      {...restProps}
    >
      {children}
    </a>
  );
};
