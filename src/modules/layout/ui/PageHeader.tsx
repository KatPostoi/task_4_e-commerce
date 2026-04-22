import type { ReactNode } from 'react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
};

export const PageHeader = ({
  eyebrow,
  title,
  description,
  actions,
  aside,
}: PageHeaderProps) => {
  return (
    <header className="page-header">
      <div className="page-header__body">
        <p className="page-header__eyebrow">{eyebrow}</p>
        <h1 className="page-header__title">{title}</h1>
        <p className="page-header__description">{description}</p>
        {actions ? <div className="page-header__actions">{actions}</div> : null}
      </div>
      {aside ? <div className="page-header__aside">{aside}</div> : null}
    </header>
  );
};
