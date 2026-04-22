import { NavLink, Link } from 'react-router-dom';
import { publicRouteItems, routePaths } from '../../../shared/config/routes';
import { Button } from '../../../shared/ui/Button/Button';

const getNavLinkClassName = (isActive: boolean) => {
  return ['site-menu__nav-link', isActive ? 'site-menu__nav-link--active' : '']
    .filter(Boolean)
    .join(' ');
};

export const SiteMenu = () => {
  return (
    <header className="site-menu">
      <div className="site-menu__surface">
        <Link className="site-menu__brand" to={routePaths.about}>
          <img
            alt="Baguette Basket"
            className="site-menu__brand-mark"
            height="48"
            src="/favicon.svg"
            width="48"
          />
          <div className="site-menu__brand-copy">
            <span className="site-menu__brand-title">Baguette Basket</span>
            <span className="site-menu__brand-subtitle">
              Мастерская рам и кастомного багета
            </span>
          </div>
        </Link>

        <nav aria-label="Основные страницы" className="site-menu__nav">
          {publicRouteItems.map((route) => (
            <NavLink
              className={({ isActive }) => getNavLinkClassName(isActive)}
              end={route.path === routePaths.about}
              key={route.key}
              to={route.path}
            >
              {route.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-menu__actions">
          <p className="site-menu__status">Public MVP</p>
          <Button size="sm" to={routePaths.design}>
            Создать свой дизайн
          </Button>
        </div>
      </div>
    </header>
  );
};
