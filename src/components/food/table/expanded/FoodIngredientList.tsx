import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { IngredientDataValue } from './food-ingredients/ExpandedSection';
import { capitalizeFirstLetter } from '../../../../helpers/utility';

interface UpdateFoodIngredientListProps {
  ingredientsList: IngredientDataValue[];
}

function FoodIngredientList({
  ingredientsList,
}: UpdateFoodIngredientListProps) {
  const ingredientNameList = ingredientsList.map(
    (ingredient) => `🍓${capitalizeFirstLetter(ingredient.name)}`
  );

  const ingredientString = ingredientNameList.join(' ');

  return (
    <Box
      sx={{
        display: 'flex',
        flexBasis: '100%',
      }}
    >
      <Typography sx={{}}>{ingredientString}</Typography>
    </Box>
  );
}

export default FoodIngredientList;
