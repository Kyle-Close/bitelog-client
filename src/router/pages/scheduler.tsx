import App from '../../App';
import Scheduler from '../../pages/scheduler';

export default {
  path: '/user/:userId/journal/:journalId/scheduler',
  element: (
    <App>
      <Scheduler view='hourly' />
    </App>
  ),
};
