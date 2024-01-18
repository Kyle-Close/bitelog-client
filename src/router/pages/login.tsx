import App from '../../App';
import Authentication from '../../components/authentication';

export default {
  path: '/login',
  element: (
    <App>
      <Authentication isLogin={true} />
    </App>
  ),
};
