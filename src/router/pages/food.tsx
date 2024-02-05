import App from '../../App';
import FoodsPage from '../../components/food/FoodsPage';

export default {
  path: '/user/:userId/food',
  element: (
    <App>
      <FoodsPage />
    </App>
  ),
};
