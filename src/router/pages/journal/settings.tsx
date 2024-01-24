import App from '../../../App';
import Journal from '../../../components/journal';
import SettingsForm from '../../../components/journal/Settings';

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
