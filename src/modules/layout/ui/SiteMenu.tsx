import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../../shared/assets/images/logo.png';
import { routePaths } from '../../../shared/config/routes';
import { LinkAsButton } from '../../../shared/ui/LinkAsButton/LinkAsButton';
import './menu.css';

type NavItem = {
  id: string;
  label: string;
  href: string;
};

const items: NavItem[] = [
  { id: 'home', label: 'О нас', href: routePaths.about },
  { id: 'catalog', label: 'Каталог', href: routePaths.catalog },
  { id: 'process', label: 'Процесс изготовления', href: routePaths.process },
  { id: 'contacts', label: 'Контакты', href: routePaths.contacts },
  { id: 'basket', label: 'Корзина', href: routePaths.basket },
];

const isItemActive = (pathname: string, href: string) => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  if (href === '/') {
    return normalizedPath === '/';
  }

  return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
};

export const SiteMenu = () => {
  const location = useLocation();

  return (
    <div>
      <div className="menu-wrapper">
        <nav aria-label="Основная навигация" className="nav-menu">
          {items.map((item) => {
            const isActive = isItemActive(location.pathname, item.href);

            return (
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'nav-menu__item',
                  'anonymous-pro-bold',
                  isActive ? 'nav-menu__item_active' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                key={item.id}
                to={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-menu__logo-wrapper">
          <img alt="Логотип Baguette Basket" className="nav-menu__logo" src={logoImg} />
        </div>

        <LinkAsButton href={routePaths.design}>Создать свой дизайн</LinkAsButton>
      </div>
    </div>
  );
};
