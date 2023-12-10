import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Authentication from './components/Authentication';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
