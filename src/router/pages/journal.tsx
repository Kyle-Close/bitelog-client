import App from '../../App';
import Journal from '../../components/journal';
import PageSelector from '../../components/journal/PageSelector';

export default {
  path: '/user/:userId/journal/:journalId',
  element: (
    <App>
      <Journal>
        <PageSelector />
      </Journal>
    </App>
  ),
};
