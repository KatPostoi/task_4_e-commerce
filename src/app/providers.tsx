import type { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

type AppProvidersProps = PropsWithChildren;

export const AppProviders = ({ children }: AppProvidersProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
