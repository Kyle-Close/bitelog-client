import { BaseModal } from '../../components/generic/BaseModal';
import { IngredientForm } from '../../components/forms/Ingredient';
import { Box, Typography } from '@mui/material';

interface IngredientModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

export function IngredientModal({ isOpen, handleClose }: IngredientModalProps) {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose}>
      <Box
        sx={{
          p: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Typography variant='h6'>Create Ingredient</Typography>
        <IngredientForm />
      </Box>
    </BaseModal>
  );
}
