import { Box } from '@mui/material';
import { BaseModal } from '../../../components/generic/BaseModal';
import TabSwitcher from '../../../components/generic/TabSwitcher';
import { FoodForm } from '../../../components/forms/Food';
import { FoodFormReducerState } from '../../../reducers/FoodFormReducer';
import { IFoods } from '../../../hooks/useFetchUserFood';
import { IngredientForm } from '../../../components/forms/Ingredient';
import { EatLogForm } from '../../../components/forms/EatLog';
import { EatLogReducerState } from '../../../reducers/EatLogFormReducer';

interface EventAndEatModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isUpdating: boolean;
  initialEatLogState?: EatLogReducerState;
  logId?: number;
}

export function SchedulerModal({
  isOpen,
  handleClose,
  isUpdating,
  initialEatLogState,
  logId,
}: EventAndEatModalProps) {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <TabSwitcher
        tabs={[
          {
            tabName: isUpdating ? 'Update Eat Log' : 'Create Eat Log',
            tabPanel: (
              <EatLogForm initialState={initialEatLogState} logId={logId} />
            ),
          },
          { tabName: 'Create Event', tabPanel: <Box /> },
        ]}
      />
    </BaseModal>
  );
}
