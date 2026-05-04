import { Outlet } from 'react-router-dom';
import { SiteFooter } from './SiteFooter';
import { SiteMenu } from './SiteMenu';

const AppShell = () => {
  return (
    <div>
      <SiteMenu />
      <Outlet />
      <SiteFooter />
    </div>
  );
};

export default AppShell;
