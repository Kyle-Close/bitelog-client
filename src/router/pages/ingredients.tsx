import App from '../../App';
import IngredientsPage from '../../pages/ingredients';

export default {
  path: '/user/:userId/ingredients',
  element: (
    <App>
      <IngredientsPage />
    </App>
  ),
};
