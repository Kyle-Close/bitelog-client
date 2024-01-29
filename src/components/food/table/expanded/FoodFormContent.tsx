import { Paper, Box, TextField, Typography, Button } from '@mui/material';
import UserIngredientSelectBox from './UserIngredientSelectBox';
import FoodIngredientList from './FoodIngredientList';
import { IngredientDataValue } from './food-ingredients/ExpandedSection';
import { Method } from '../../../../helpers/utility';

interface FoodFormContentProps {
  foodName: string;
  handleNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ingredients: IngredientDataValue[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientDataValue[]>>;
  userIngredientList: IngredientDataValue[];
  method: Method;
}

function FoodFormContent({
  foodName,
  handleNameChange,
  ingredients,
  setIngredients,
  userIngredientList,
  method,
}: FoodFormContentProps) {
  const submitBtn =
    method === 'POST' ? (
      <Button sx={{ mt: '1rem' }} variant='contained' type='submit'>
        Create Food
      </Button>
    ) : (
      <Button
        sx={{ mt: '1rem' }}
        color='secondary'
        variant='contained'
        type='submit'
      >
        Update Food
      </Button>
    );

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '1rem',
        flexGrow: 1,
        gap: '1rem',
        backgroundColor: method === 'POST' ? 'RGBA(35, 158, 67, 0.5)' : '',
      }}
      elevation={24}
    >
      <Box sx={{ display: 'flex', flexGrow: 1, gap: '1rem' }}>
        <TextField
          sx={{ display: 'flex', width: '50%' }}
          size='small'
          variant='outlined'
          label='Food Name'
          placeholder={foodName}
          value={foodName}
          onChange={handleNameChange}
        ></TextField>
        <UserIngredientSelectBox
          ingredients={ingredients}
          setIngredients={setIngredients}
          userIngredientList={userIngredientList}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}
      >
        <Typography fontWeight='600'>Ingredients</Typography>
        <FoodIngredientList ingredientsList={ingredients} />
        {submitBtn}
      </Box>
    </Paper>
  );
}

export default FoodFormContent;
