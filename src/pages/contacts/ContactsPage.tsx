import { Header } from '../../modules/layout/ui/Header';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';
import { contactsContent } from '../../modules/content/data/contacts-content';
import { TopicSection } from '../../shared/ui/TopicSection/TopicSection';
import { TopicSectionTitle } from '../../shared/ui/TopicSection/TopicSectionTitle';
import { TextPosition } from '../../shared/ui/TopicSection/types';
import './contacts-page.css';

const ContactsPage = () => {
  return (
    <div className="ContactsPage">
      <MainWrapper>
        <Header />

        <TopicSection className="contacts-section">
          <TopicSectionTitle textPosition={TextPosition.CENTER}>Контакты</TopicSectionTitle>
          <div className="contacts-content">
            <div className="contacts-content__column">
              <h3 className="anonymous-pro-bold home-text-block__sm_orange">Телефон</h3>
              <a
                className="anonymous-pro-bold home-text-block__md__left contacts-content__link"
                href={`tel:${contactsContent.phone.replace(/[^\d+]/g, '')}`}
              >
                {contactsContent.phone}
              </a>
            </div>

            <div className="contacts-content__column">
              <h3 className="anonymous-pro-bold home-text-block__sm_orange">Email</h3>
              <a
                className="anonymous-pro-bold home-text-block__md__left contacts-content__link"
                href={`mailto:${contactsContent.email}`}
              >
                {contactsContent.email}
              </a>
            </div>
          </div>
        </TopicSection>

        <TopicSection className="address-section">
          <TopicSectionTitle textPosition={TextPosition.CENTER}>Наш адрес</TopicSectionTitle>
          <div className="contacts-content">
            <div className="contacts-content__column contacts-content__column_wide">
              <h3 className="anonymous-pro-bold home-text-block__sm_orange">Шоу-рум и самовывоз</h3>
              <p className="anonymous-pro-bold home-text-block__md__left">{contactsContent.address[0]}</p>
              <p className="anonymous-pro-bold home-text-block__sm">{contactsContent.address[1]}</p>
              <p className="anonymous-pro-bold home-text-block__vsm_grey">{contactsContent.workingHours.join(' · ')}</p>
            </div>
          </div>
        </TopicSection>
      </MainWrapper>
    </div>
  );
};

export default ContactsPage;
