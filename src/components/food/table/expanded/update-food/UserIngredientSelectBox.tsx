import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { IngredientDataValue } from '../food-ingredients/ExpandedSection';
import { useEffect, useState } from 'react';

interface UserIngredientSelectBoxProps {
  userIngredientList: IngredientDataValue[]; // all ingredients user has
  ingredients: IngredientDataValue[]; // ingredients in the current food
  setIngredients: React.Dispatch<React.SetStateAction<IngredientDataValue[]>>;
}

function UserIngredientSelectBox({
  userIngredientList,
  ingredients,
  setIngredients,
}: UserIngredientSelectBoxProps) {
  const [selectedIngredientIds, setSelectedIngredientIds] = useState(
    ingredients.map((ingredient) => ingredient.id)
  );

  useEffect(() => {
    const newSelectedIds = ingredients.map((ingredient) => ingredient.id);
    setSelectedIngredientIds(newSelectedIds);
  }, [ingredients]);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const value = event.target.value as number[];
    console.log('value', value);
    setSelectedIngredientIds(value);

    // Convert IDs back to IngredientDataValue objects
    const updatedIngredients = userIngredientList.filter((ingredient) =>
      value.includes(ingredient.id)
    );

    setIngredients(updatedIngredients);
  };

  return (
    <FormControl sx={{ width: '50%' }}>
      <InputLabel id='ingredients-label'>Ingredients</InputLabel>
      <Select
        labelId='ingredients-label'
        onChange={handleChange}
        id='ingredients'
        size='small'
        input={<OutlinedInput label='Ingredients' />}
        MenuProps={MenuProps}
        sx={{ maxHeight: '350px', maxWidth: '12rem' }}
        value={selectedIngredientIds}
        multiple
        renderValue={(selected) =>
          selected
            .map((id) => userIngredientList.find((ing) => ing.id === id)?.name)
            .join(', ')
        }
      >
        {userIngredientList.map((ingredient, key) => {
          const id = ingredient.id;
          console.log(selectedIngredientIds.includes(id));

          return (
            <MenuItem key={key} value={ingredient.id}>
              <Checkbox
                checked={selectedIngredientIds.includes(ingredient.id)}
              />
              <ListItemText primary={ingredient.name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 250,
    },
  },
};

export default UserIngredientSelectBox;
