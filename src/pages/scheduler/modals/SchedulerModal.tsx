import { Box } from '@mui/material';
import { BaseModal } from '../../../components/generic/BaseModal';
import TabSwitcher from '../../../components/generic/TabSwitcher';
import { FoodForm } from '../../../components/forms/Food';
import { FoodFormReducerState } from '../../../reducers/FoodFormReducer';
import { IFoods } from '../../../hooks/useFetchUserFood';
import { IngredientForm } from '../../../components/forms/Ingredient';
import { EatLogForm } from '../../../components/forms/EatLog';

interface EventAndEatModalProps {
  isOpen: boolean;
  handleClose: () => void;
  isUpdating: boolean;
}

export function SchedulerModal({
  isOpen,
  handleClose,
  isUpdating,
}: EventAndEatModalProps) {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <TabSwitcher
        tabs={[
          {
            tabName: isUpdating ? 'Update Eat Log' : 'Create Eat Log',
            tabPanel: <EatLogForm />,
          },
          { tabName: 'Create Event', tabPanel: <Box /> },
          {
            tabName: isUpdating ? 'Update Food' : 'Create Food',
            tabPanel: <FoodForm isUpdating={isUpdating} />,
          },
          { tabName: 'Create Ingredient', tabPanel: <IngredientForm /> },
        ]}
      />
    </BaseModal>
  );
}
