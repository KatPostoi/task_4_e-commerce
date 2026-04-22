import { Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from '../pages/about/AboutPage';
import BasketPage from '../pages/basket/BasketPage';
import CatalogPage from '../pages/catalog/CatalogPage';
import ContactsPage from '../pages/contacts/ContactsPage';
import DesignPage from '../pages/design/DesignPage';
import ProcessPage from '../pages/process/ProcessPage';
import { routePaths, routeSegments } from '../shared/config/routes';
import AppShell from '../modules/layout/ui/AppShell';

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<AboutPage />} />
        <Route path={routeSegments.process} element={<ProcessPage />} />
        <Route path={routeSegments.contacts} element={<ContactsPage />} />
        <Route path={routeSegments.catalog} element={<CatalogPage />} />
        <Route path={routeSegments.design} element={<DesignPage />} />
        <Route path={routeSegments.basket} element={<BasketPage />} />
      </Route>
      <Route path="*" element={<Navigate to={routePaths.about} replace />} />
    </Routes>
  );
};
