import { PageHeader } from '../../modules/layout/ui/PageHeader';
import { contactsContent } from '../../modules/content/data/contacts-content';
import { Section } from '../../shared/ui/Section/Section';
import { Button } from '../../shared/ui/Button/Button';
import { routePaths } from '../../shared/config/routes';
import './contacts-page.css';

const phoneHref = `tel:${contactsContent.phone.replace(/[^\d+]/g, '')}`;

const contactMethods = [
  {
    label: 'Телефон',
    value: contactsContent.phone,
    href: phoneHref,
  },
  {
    label: 'Email',
    value: contactsContent.email,
    href: `mailto:${contactsContent.email}`,
  },
] as const;

const ContactsPage = () => {
  return (
    <div className="contacts-page">
      <PageHeader
        actions={
          <>
            <Button href={phoneHref}>Позвонить</Button>
            <Button to={routePaths.design} variant="secondary">
              Перейти в конструктор
            </Button>
          </>
        }
        aside={
          <div className="contacts-page__quick-card">
            <h2 className="contacts-page__quick-title">
              {contactsContent.quickInfoTitle}
            </h2>
            <p className="contacts-page__quick-text">
              {contactsContent.quickInfoDescription}
            </p>
          </div>
        }
        description={contactsContent.summary}
        eyebrow={contactsContent.eyebrow}
        title={contactsContent.title}
      />

      <div className="contacts-page__grid">
        <Section
          className="contacts-page__section"
          description={contactsContent.studioDescription}
          eyebrow="Адрес"
          title={contactsContent.studioTitle}
          tone="default"
        >
          <div className="contacts-page__stack">
            <p className="contacts-page__main-line">
              {contactsContent.address[0]}
            </p>
            <p className="contacts-page__meta-line">
              {contactsContent.address[1]}
            </p>
            <p className="contacts-page__meta-line">
              {contactsContent.workingHours.join(' · ')}
            </p>
          </div>
        </Section>

        <Section
          className="contacts-page__section"
          description={contactsContent.responseDescription}
          eyebrow="Связь"
          title={contactsContent.responseTitle}
          tone="muted"
        >
          <div className="contacts-page__contact-list">
            {contactMethods.map((method) => (
              <a className="contacts-page__contact-item" href={method.href} key={method.label}>
                <span className="contacts-page__contact-label">{method.label}</span>
                <span className="contacts-page__contact-value">{method.value}</span>
              </a>
            ))}
          </div>

          <div className="contacts-page__socials">
            {contactsContent.socials.map((socialLink) => (
              <a
                className="contacts-page__social-link"
                href={socialLink.href}
                key={socialLink.label}
                rel="noreferrer noopener"
                target="_blank"
              >
                {socialLink.label}
              </a>
            ))}
          </div>
        </Section>
      </div>

      <Section
        className="contacts-page__notes-section"
        description="Это минимальная, но уже законченная версия страницы контактов: только реальные данные и практические подсказки."
        eyebrow="Перед визитом"
        title="Что лучше подготовить заранее"
        tone="contrast"
      >
        <ul className="contacts-page__notes-list">
          {contactsContent.visitNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
};

export default ContactsPage;
