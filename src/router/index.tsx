import { createBrowserRouter } from 'react-router-dom';
import landingPage from './pages/landingPage';
import login from './pages/login';
import register from './pages/register';
import journal from './pages/journal';
import settings from './pages/journal/settings';

const routes = [landingPage, login, register, journal, settings];

export const router = createBrowserRouter(routes);
