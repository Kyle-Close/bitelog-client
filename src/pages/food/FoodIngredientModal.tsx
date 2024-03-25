import TabSwitcher from '../../components/generic/TabSwitcher';
import { BaseModal } from '../../components/generic/BaseModal';
import { FoodForm } from '../../components/forms/Food';
import { IngredientForm } from '../../components/forms/Ingredient';
import { FoodFormReducerState } from '../../reducers/FoodFormReducer';
import { IFoods } from '../../hooks/useFetchUserFood';

interface FoodIngredientModalProps {
  isOpen: boolean;
  handleClose: () => void;
  initialFoodFormState?: FoodFormReducerState;
  isUpdating?: boolean;
  food?: IFoods;
}

export function FoodIngredientModal({
  isOpen,
  handleClose,
  initialFoodFormState,
  isUpdating,
  food,
}: FoodIngredientModalProps) {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <TabSwitcher
        tabs={[
          {
            tabName: isUpdating ? 'Update Food' : 'Create Food',
            tabPanel: (
              <FoodForm
                initialFoodFormState={initialFoodFormState}
                isUpdating={isUpdating}
                food={food}
              />
            ),
          },
          { tabName: 'Create Ingredient', tabPanel: <IngredientForm /> },
        ]}
      />
    </BaseModal>
  );
}
