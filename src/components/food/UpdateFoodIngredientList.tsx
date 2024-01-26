import {
  Box,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { IngredientDataValue } from './ExpandedSection';

interface UpdateFoodIngredientListProps {
  ingredientsList: IngredientDataValue[];
  setIngredients: (ingredientList: IngredientDataValue[]) => void;
}

function UpdateFoodIngredientList({
  ingredientsList,
  setIngredients,
}: UpdateFoodIngredientListProps) {
  const handleClick = (ingredientId: number) => {
    const newIngredientList = ingredientsList.filter(
      (ingredient) => ingredient.id !== ingredientId
    );
    setIngredients(newIngredientList);
  };

  const createIngredientList = () => {
    return ingredientsList.map((ingredient, key) => {
      return (
        <ListItem dense key={key}>
          <ListItemButton onClick={() => handleClick(ingredient.id)}>
            <ListItemIcon>
              <RemoveIcon color='error' />
            </ListItemIcon>
            <ListItemText sx={{ flexGrow: 1 }}>{ingredient.name}</ListItemText>
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '50%',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ fontWeight: '700' }}>Ingredient List</Typography>
      <Divider />
      <List>{createIngredientList()}</List>
    </Box>
  );
}

export default UpdateFoodIngredientList;
