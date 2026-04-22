import { Button } from '../../shared/ui/Button/Button';
import { Section } from '../../shared/ui/Section/Section';
import { PageHeader } from '../../modules/layout/ui/PageHeader';
import { routePaths } from '../../shared/config/routes';
import { aboutPageContent } from '../../modules/content/data/about-content';
import './about-page.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <PageHeader
        actions={
          <>
            <Button to={routePaths.process}>Посмотреть процесс</Button>
            <Button to={routePaths.design} variant="secondary">
              Создать свой дизайн
            </Button>
          </>
        }
        aside={
          <div className="about-page__hero-card">
            <img
              alt={aboutPageContent.heroImage.alt}
              className="about-page__hero-image"
              src={aboutPageContent.heroImage.src}
            />
            <p className="about-page__hero-note">
              Визуальный язык проекта остаётся узнаваемым, но логика собирается
              заново вокруг публичного MVP.
            </p>
          </div>
        }
        description={aboutPageContent.summary}
        eyebrow={aboutPageContent.eyebrow}
        title={aboutPageContent.title}
      />

      <Section
        className="about-page__story-section"
        description={aboutPageContent.storyDescription}
        eyebrow={aboutPageContent.storyEyebrow}
        title={aboutPageContent.storyTitle}
        tone="muted"
      >
        <div className="about-page__stats" role="list">
          {aboutPageContent.stats.map((stat) => (
            <article className="about-page__stat-card" key={stat.label} role="listitem">
              <strong className="about-page__stat-value">{stat.value}</strong>
              <span className="about-page__stat-label">{stat.label}</span>
            </article>
          ))}
        </div>

        <div className="about-page__story-grid">
          {aboutPageContent.storyBlocks.map((storyBlock) => (
            <article className="about-page__story-card" key={storyBlock.id}>
              <h3 className="about-page__story-title">{storyBlock.title}</h3>
              <p className="about-page__story-text">{storyBlock.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        className="about-page__principles-section"
        description={aboutPageContent.principlesDescription}
        eyebrow={aboutPageContent.principlesEyebrow}
        title={aboutPageContent.principlesTitle}
        tone="contrast"
      >
        <div className="about-page__principles-grid">
          {aboutPageContent.principles.map((principle) => (
            <article className="about-page__principle-card" key={principle.id}>
              <h3 className="about-page__principle-title">{principle.title}</h3>
              <p className="about-page__principle-text">{principle.description}</p>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;
