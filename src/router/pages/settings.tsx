import App from '../../App';
import Journal from '../../pages/journal';
import SettingsForm from '../../pages/journal/Settings';

export default {
  path: '/user/:userId/journal/:journalId/settings',
  element: (
    <App>
      <Journal>
        <SettingsForm />
      </Journal>
    </App>
  ),
};
