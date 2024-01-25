import App from '../../../App';
import IngredientsPage from '../../../components/journal/IngredientsPage';

export default {
  path: '/user/:userId/ingredients',
  element: (
    <App>
      <IngredientsPage />
    </App>
  ),
};
