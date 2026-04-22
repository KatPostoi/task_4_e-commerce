import headerImage from '../../../shared/assets/images/block_header.png';
import './header.css';

export const Header = () => {
  return (
    <div className="process-header">
      <img
        alt="HeaderWallpaper"
        className="process-header_image"
        src={headerImage}
      />
    </div>
  );
};
