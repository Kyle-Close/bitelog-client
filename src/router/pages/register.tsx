import App from '../../App';
import Authentication from '../../components/authentication';

export default {
  path: '/register',
  element: (
    <App>
      <Authentication isLogin={false} />
    </App>
  ),
};
