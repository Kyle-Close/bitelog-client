import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Authentication from './components/Authentication';
import LandingPage from './components/LandingPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <App>
        <LandingPage />
      </App>
    ),
  },
  {
    path: '/login',
    element: (
      <App>
        <Authentication />
      </App>
    ),
  },
]);
