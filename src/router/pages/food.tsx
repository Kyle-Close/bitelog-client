import App from '../../App';
import FoodsPage from '../../pages/food';

export default {
  path: '/user/:userId/food',
  element: (
    <App>
      <FoodsPage />
    </App>
  ),
};
