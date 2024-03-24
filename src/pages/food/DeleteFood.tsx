import { Box, Button, Typography } from '@mui/material';
import { IFoods } from '../../hooks/useFetchUserFood';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../context';
import { makeRequestToBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';

interface DeleteFoodProps {
  food: IFoods;
  handleClose: () => void;
}

export function DeleteFood({ food, handleClose }: DeleteFoodProps) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const deleteFoodMutation = useMutation({
    mutationKey: ['food', user?.uid],
    mutationFn: () => deleteFood(),
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries({
        queryKey: ['food', user?.uid],
      });
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    deleteFoodMutation.mutate();
  };

  const deleteFood = async () => {
    if (!user || !user.uid) return;
    try {
      await makeRequestToBackend({
        url: `${BASE_URL}/user/${user.uid}/food/${food.id}`,
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
        Food Item:{' '}
        <Typography color='white' component='span'>
          {food.name}
        </Typography>
      </Typography>
      <Typography>
        Are you sure you want to delete this food item? This action cannot be
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
