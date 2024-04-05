import { BaseModal } from '../../../components/generic/BaseModal';
import TabSwitcher from '../../../components/generic/TabSwitcher';
import { EatLogForm } from '../../../components/forms/EatLog';
import { EatLogReducerState } from '../../../reducers/EatLogFormReducer';
import { EventLogForm } from '../../../components/forms/EventLog';
import { EventLogFormState } from '../../../hooks/useEventLogForm';

interface EventAndEatModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isUpdating: boolean;
  initialEatLogState?: EatLogReducerState;
  initialEventState?: EventLogFormState;
  logId?: number;
  activeTab?: number;
}

export function SchedulerModal({
  isOpen,
  handleClose,
  isUpdating,
  initialEatLogState,
  initialEventState,
  logId,
  activeTab,
}: EventAndEatModalProps) {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <TabSwitcher
        activeTab={activeTab}
        tabs={[
          {
            tabName: isUpdating ? 'Update Eat Log' : 'Create Eat Log',
            tabPanel: (
              <EatLogForm initialState={initialEatLogState} logId={logId} />
            ),
          },
          {
            tabName: isUpdating ? 'Update Event' : 'Create Event',
            tabPanel: (
              <EventLogForm initialState={initialEventState} logId={logId} />
            ),
          },
        ]}
      />
    </BaseModal>
  );
}
