import { Link } from 'react-router-dom';
import { contactsContent } from '../../content/data/contacts-content';
import { publicRouteItems } from '../../../shared/config/routes';

const phoneHref = `tel:${contactsContent.phone.replace(/[^\d+]/g, '')}`;

export const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <p className="site-footer__eyebrow">Baguette Basket</p>
        <h2 className="site-footer__title">
          Публичный frontend-only MVP с локальными данными и чистым route shell.
        </h2>
        <p className="site-footer__description">
          Мы сознательно оставили только страницы MVP, убрали auth/admin слои и
          собираем поведение вокруг mock data и `localStorage`.
        </p>
      </div>

      <div className="site-footer__column">
        <h3 className="site-footer__heading">Навигация</h3>
        <div className="site-footer__links">
          {publicRouteItems.map((route) => (
            <Link className="site-footer__link" key={route.key} to={route.path}>
              {route.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="site-footer__column">
        <h3 className="site-footer__heading">Контакты</h3>
        <div className="site-footer__contact-list">
          <a className="site-footer__link" href={phoneHref}>
            {contactsContent.phone}
          </a>
          <a
            className="site-footer__link"
            href={`mailto:${contactsContent.email}`}
          >
            {contactsContent.email}
          </a>
          <p className="site-footer__meta">{contactsContent.address.join(', ')}</p>
          <p className="site-footer__meta">
            {contactsContent.workingHours.join(' · ')}
          </p>
        </div>
      </div>

      <div className="site-footer__column">
        <h3 className="site-footer__heading">Соцсети</h3>
        <div className="site-footer__socials">
          {contactsContent.socials.map((socialLink) => (
            <a
              className="site-footer__social-link"
              href={socialLink.href}
              key={socialLink.label}
              rel="noreferrer noopener"
              target="_blank"
            >
              {socialLink.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
