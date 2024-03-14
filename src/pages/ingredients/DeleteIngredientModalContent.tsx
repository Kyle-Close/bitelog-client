import { Box, Button, Typography } from '@mui/material';

interface DeleteIngredientProps {
  handleDelete: (id: number) => void;
  handleClose: () => void;
  currentIngredient: { name: string; id: number };
}

function DeleteIngredientModalContent({
  handleDelete,
  handleClose,
  currentIngredient,
}: DeleteIngredientProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography fontWeight='600' fontSize='0.85rem' color='error'>
        Removing
        <Box component='span' color='whitesmoke'>
          {' '}
          {currentIngredient.name}{' '}
        </Box>
        will also delete any food items linked to this ingredient.
      </Typography>
      <Button
        variant='contained'
        onClick={() => {
          handleDelete(currentIngredient.id);
          handleClose();
        }}
      >
        Confirm Delete
      </Button>
    </Box>
  );
}

export default DeleteIngredientModalContent;
