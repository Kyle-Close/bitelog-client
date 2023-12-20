import { UserProvider } from './contexts';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

interface IAllTheProviders {
  children: React.ReactNode;
}

function AllTheProviders({ children }: IAllTheProviders) {
  return (
    <UserProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </UserProvider>
  );
}

function customRender(ui: any, options?: any) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
