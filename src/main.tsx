import React from 'react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { UserProvider } from './contexts/UserContext.tsx';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const client = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
