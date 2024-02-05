import { createBrowserRouter } from 'react-router-dom';
import landingPage from './pages/landingPage';
import login from './pages/login';
import register from './pages/register';
import journal from './pages/journal';
import settings from './pages/settings';
import ingredients from './pages/ingredients';
import food from './pages/food';
import scheduler from './pages/scheduler';

const routes = [
  landingPage,
  login,
  register,
  journal,
  settings,
  ingredients,
  food,
  scheduler,
];

export const router = createBrowserRouter(routes);
