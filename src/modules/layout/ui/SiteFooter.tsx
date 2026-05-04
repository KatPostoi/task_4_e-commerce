import { Link } from 'react-router-dom';
import { contactsContent } from '../../content/data/contacts-content';
import { routePaths } from '../../../shared/config/routes';
import './footer.css';

type FooterItem = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

const items: FooterItem[] = [
  { id: '1', label: 'О нас', href: routePaths.about },
  { id: '2', label: 'Контакты', href: routePaths.contacts },
  { id: '3', label: 'Политика конфиденциальности', href: routePaths.about },
  {
    id: '4',
    label: contactsContent.phone,
    href: `tel:${contactsContent.phone.replace(/[^\d+]/g, '')}`,
    external: true,
  },
  { id: '5', label: 'Публичная оферта', href: routePaths.about },
  { id: '6', label: contactsContent.email, href: `mailto:${contactsContent.email}`, external: true },
  { id: '7', label: 'Рекомендации по уходу и гарантия', href: routePaths.about },
  { id: '8', label: contactsContent.address.join(', '), href: routePaths.contacts },
];

export const SiteFooter = () => {
  return (
    <div className="footer-all">
      <div className="social">
        <h2 className="anonymous-pro-bold home-text-block__md_white">Мы в социальных сетях</h2>
        <a href={contactsContent.socials[0]?.href} rel="noreferrer noopener" target="_blank">
          <div className="social-link-tg"></div>
        </a>
        <a href={contactsContent.socials[2]?.href} rel="noreferrer noopener" target="_blank">
          <div className="social-link-vk"></div>
        </a>
      </div>
      <nav className="footer-wrapper">
        {items.map((item) =>
          item.external ? (
            <a
              className="footer__item anonymous-pro-bold home-text-block__md_white"
              href={item.href}
              key={item.id}
              rel={item.href.startsWith('http') ? 'noreferrer noopener' : undefined}
              target={item.href.startsWith('http') ? '_blank' : undefined}
            >
              {item.label}
            </a>
          ) : (
            <Link className="footer__item anonymous-pro-bold home-text-block__md_white" key={item.id} to={item.href}>
              {item.label}
            </Link>
          ),
        )}
      </nav>
    </div>
  );
};
