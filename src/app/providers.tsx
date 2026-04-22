import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../modules/cart/model/CartProvider';

type AppProvidersProps = PropsWithChildren;

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <BrowserRouter>
      <CartProvider>{children}</CartProvider>
    </BrowserRouter>
  );
};
