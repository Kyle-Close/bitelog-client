import { Box } from '@mui/material';
import TabSwitcher from '../../components/generic/TabSwitcher';
import { BaseModal } from '../../components/generic/BaseModal';
import { FoodForm } from '../../components/forms/Food';

interface FoodIngredientModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function FoodIngredientModal({ isOpen, handleClose }: FoodIngredientModalProps) {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <TabSwitcher
        tabs={[
          { tabName: 'Create Food', tabPanel: <FoodForm /> },
          { tabName: 'Create Ingredient', tabPanel: <Box>TO DO...</Box> },
        ]}
      />
    </BaseModal>
  );
}
