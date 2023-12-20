import React from 'react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
