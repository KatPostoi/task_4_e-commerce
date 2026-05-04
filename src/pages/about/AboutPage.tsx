import blockBaguetteImg from '../../shared/assets/images/block_baguette.png';
import img1 from '../../shared/assets/images/1.jpg';
import img2 from '../../shared/assets/images/2.jpg';
import img3 from '../../shared/assets/images/3.jpg';
import img4 from '../../shared/assets/images/4.jpg';
import { aboutPageContent } from '../../modules/content/data/about-content';
import { MainWrapper } from '../../modules/layout/ui/MainWrapper';
import './about-page.css';

const AboutPage = () => {
  return (
    <div className="HomePage">
      <MainWrapper>
        <img alt="Wallpaper" src={blockBaguetteImg} />

        <div className="home-text-block anonymous-pro-bold">
          <h2 className="home-text-block__md">{aboutPageContent.summary}</h2>
        </div>

        <div className="our_principe_wrapper">
          <h2 className="anonymous-pro-bold home-text-block__xl_white">
            Наши <br />
            принципы
          </h2>
          <div className="our_principe_card_wrapper">
            <div className="our_principe_card">
              <h2 className="anonymous-pro-bold home-text-block__sm">{aboutPageContent.principles[0].description}</h2>
              <h2 className="anonymous-pro-bold home-text-block__sm">{aboutPageContent.principles[1].description}</h2>
              <img alt="ImageCardFirst" src={img1} />
              <img alt="ImageCardSecond" src={img2} />
            </div>
            <div className="our_principe_card">
              <h2 className="anonymous-pro-bold home-text-block__sm">{aboutPageContent.principles[2].description}</h2>
              <h2 className="anonymous-pro-bold home-text-block__sm">{aboutPageContent.principles[3].description}</h2>
              <img alt="ImageCardThird" src={img3} />
              <img alt="ImageCardFourth" src={img4} />
            </div>
            <div className="our_principe_card">
              <h2 className="anonymous-pro-bold home-text-block__sm">{aboutPageContent.principles[4].description}</h2>
            </div>
          </div>
        </div>
      </MainWrapper>
    </div>
  );
};

export default AboutPage;
