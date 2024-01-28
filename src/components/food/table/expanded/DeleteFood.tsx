import { Box, Button, Typography } from '@mui/material';
import { FoodDataValues } from '../../FoodsPage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../../../contexts';
import { makeRequestToBackend } from '../../../../helpers/utility';
import { BASE_URL } from '../../../../config/axiosConfig';

interface DeleteFoodProps {
  food: FoodDataValues;
}

const deleteFoodFn = (uid: string | undefined, foodId: number) => {
  const url = BASE_URL + `/user/${uid}/food/${foodId}`;
  const method = 'DELETE';

  return makeRequestToBackend({ url, method });
};

function DeleteFood({ food }: DeleteFoodProps) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const deleteFoodMutation = useMutation({
    mutationKey: ['food', user?.uid, food.id],
    mutationFn: () => deleteFoodFn(user?.uid, food.id),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ['food', user?.uid] }),
  });

  const handleClick = () => {
    deleteFoodMutation.mutate();
  };

  return (
    <Box
      component='form'
      sx={{
        p: '1rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Typography>
        Are you sure you want to delete the food '{food.name}'?
      </Typography>
      <Button onClick={handleClick} variant='contained' color='error'>
        Confirm Delete
      </Button>
    </Box>
  );
}

export default DeleteFood;
