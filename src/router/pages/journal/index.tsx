import App from '../../../App';
import Journal from '../../../components/journal';

export default {
  path: '/user/:userId/journal',
  element: (
    <App>
      <Journal />
    </App>
  ),
};
