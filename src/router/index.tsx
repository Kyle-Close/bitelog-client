import { createBrowserRouter } from 'react-router-dom';
import landingPage from './pages/landingPage';
import login from './pages/login';
import register from './pages/register';

const routes = [landingPage, login, register];

export const router = createBrowserRouter(routes);
