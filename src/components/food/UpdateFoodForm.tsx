import { Box, Paper, TextField } from '@mui/material';
import { FoodDataValues } from './FoodsPage';

interface UpdateFoodFormProps {
  food: FoodDataValues;
}

function UpdateFoodForm({ food }: UpdateFoodFormProps) {
  return (
    <Box component='form' sx={{ display: 'flex', flexGrow: 1 }}>
      <Paper sx={{ display: 'flex', p: '1rem', flexGrow: 1 }} elevation={24}>
        <TextField
          size='small'
          variant='standard'
          label='Food Name'
          placeholder={food.name}
          value={food.name}
        ></TextField>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          Ingredient List
        </Box>
      </Paper>
    </Box>
  );
}

export default UpdateFoodForm;
