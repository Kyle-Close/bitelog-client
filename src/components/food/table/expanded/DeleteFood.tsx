import { Box, Button, Typography } from '@mui/material';
import { FoodDataValues } from '../../FoodsPage';

interface DeleteFoodProps {
  food: FoodDataValues;
}

function DeleteFood({ food }: DeleteFoodProps) {
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
      <Button variant='contained' color='error'>
        Confirm Delete
      </Button>
    </Box>
  );
}

export default DeleteFood;
