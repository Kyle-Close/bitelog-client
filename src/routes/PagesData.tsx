import App from '../App';
import LandingPage from '../pages/landing';
import Journal from '../pages/journal';
import PageSelector from '../pages/journal/PageSelector';
import Scheduler from '../pages/scheduler';
import Authentication from '../components/authentication';
import FoodsPage from '../pages/food';
import IngredientsPage from '../pages/ingredients';
import SettingsForm from '../pages/journal/Settings';
import { About } from '../pages/about';

const pagesData = [
  {
    path: '',
    element: (
      <App>
        <LandingPage />
      </App>
    ),
    title: 'home',
  },
  {
    path: '/user/:userId/journal/:journalId',
    element: (
      <App>
        <Journal>
          <PageSelector />
        </Journal>
      </App>
    ),
    title: 'journal',
  },
  {
    path: '/user/:userId/journal/:journalId/scheduler',
    element: (
      <App>
        <Scheduler view='hourly' />
      </App>
    ),
    title: 'scheduler',
  },
  {
    path: '/login',
    element: (
      <App>
        <Authentication isLogin={true} />
      </App>
    ),
    title: 'login',
  },
  {
    path: '/register',
    element: (
      <App>
        <Authentication isLogin={false} />
      </App>
    ),
    title: 'register',
  },
  {
    path: '/user/:userId/food',
    element: (
      <App>
        <FoodsPage />
      </App>
    ),
    title: 'foods',
  },
  {
    path: '/user/:userId/ingredients',
    element: (
      <App>
        <IngredientsPage />
      </App>
    ),
    title: 'ingredients',
  },
  {
    path: '/user/:userId/journal/:journalId/settings',
    element: (
      <App>
        <Journal>
          <SettingsForm />
        </Journal>
      </App>
    ),
    title: 'journal',
  },
  {
    path: '/about',
    element: (
      <App>
        <About />
      </App>
    ),
    title: 'about',
  },
];

export default pagesData;
