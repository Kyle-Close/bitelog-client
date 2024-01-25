import App from '../../../App';
import Journal from '../../../components/journal';
import IngredientsPage from '../../../components/journal/Ingredients';

export default {
  path: '/user/:userId/journal/:journalId/ingredients',
  element: (
    <App>
      <IngredientsPage />
    </App>
  ),
};
