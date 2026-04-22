import { Outlet } from 'react-router-dom';
import { SiteFooter } from './SiteFooter';
import { SiteMenu } from './SiteMenu';
import './layout.css';

const AppShell = () => {
  return (
    <div className="app-shell">
      <div className="app-shell__container">
        <SiteMenu />
        <main className="app-shell__main">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
};

export default AppShell;
