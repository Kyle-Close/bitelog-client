import { Box, Button, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../context';
import { makeRequestToBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import { IngredientType } from '../../hooks/useFoodForm';

interface DeleteIngredientProps {
  ingredient: IngredientType;
  handleClose: () => void;
}

export function DeleteIngredient({
  ingredient,
  handleClose,
}: DeleteIngredientProps) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const deleteIngredientMutation = useMutation({
    mutationKey: ['ingredients', user?.uid],
    mutationFn: () => deleteIngredient(),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['ingredients', user?.uid],
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteIngredientMutation.mutate();
  };

  const deleteIngredient = async () => {
    if (!user || !user.uid) return;
    try {
      await makeRequestToBackend({
        url: `${BASE_URL}/user/${user.uid}/ingredients/${ingredient.id}`,
        method: 'DELETE',
      });
    } catch (err) {
      throw err;
    }
  };
  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        p: '1rem',
      }}
    >
      <Typography variant='h5'>Confirm Deletion</Typography>
      <Typography fontWeight='bold' color='primary'>
        Ingredient Item:{' '}
        <Typography color='white' component='span'>
          {ingredient.name}
        </Typography>
      </Typography>
      <Typography>
        Are you sure you want to delete this ingredient? This action cannot be
        undone.
      </Typography>
      <Button
        type='submit'
        sx={{ mt: '0.5rem' }}
        variant='contained'
        color='error'
      >
        Confirm
      </Button>
    </Box>
  );
}
