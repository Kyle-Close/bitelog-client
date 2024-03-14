import App from '../../App';
import Journal from '../../pages/journal';
import PageSelector from '../../pages/journal/PageSelector';

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
