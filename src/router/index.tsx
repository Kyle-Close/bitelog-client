import { createBrowserRouter } from 'react-router-dom';
import landingPage from './pages/landingPage';
import login from './pages/login';
import register from './pages/register';
import journal from './pages/journal';
import settings from './pages/journal/settings';
import ingredients from './pages/journal/ingredients';
import food from './pages/journal/food';

const routes = [
  landingPage,
  login,
  register,
  journal,
  settings,
  ingredients,
  food,
];

export const router = createBrowserRouter(routes);
