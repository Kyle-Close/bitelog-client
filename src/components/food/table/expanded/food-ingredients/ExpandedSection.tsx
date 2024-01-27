import { Box, List, Typography, ListItem, Paper } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../../../../contexts';
import { useQuery } from '@tanstack/react-query';
import { fetchDataFromBackend } from '../../../../../helpers/utility';
import { BASE_URL } from '../../../../../config/axiosConfig';

interface ExpandedSectionProps {
  foodId: number;
}

export type IngredientDataValue = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

function ExpandedSection({ foodId }: ExpandedSectionProps) {
  const { user } = useContext(UserContext);
  const { data, error, isLoading } = useQuery({
    queryKey: [
      'food ingredients',
      {
        uid: user?.uid,
        foodId: foodId,
      },
    ],
    queryFn: () =>
      fetchDataFromBackend(BASE_URL + `/user/${user?.uid}/food/${foodId}`),
  });

  if (error) {
    return <Typography>Error fetching food ingredients</Typography>;
  }

  if (isLoading || !data) {
    return <Typography>Loading ingredients...</Typography>;
  }

  const ingredients: IngredientDataValue[] = data.ingredientsDataValues;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem' }}>
      <Typography fontSize='0.85rem' variant='h6'>
        Ingredient List
      </Typography>
      <Paper elevation={6}>
        <IngredientList ingredients={ingredients} />
      </Paper>
    </Box>
  );
}

interface IngredientsListProps {
  ingredients: IngredientDataValue[];
}

function IngredientList({ ingredients }: IngredientsListProps) {
  const createList = () => {
    return ingredients.map((ingredient, key) => {
      return (
        <ListItem key={key} disablePadding>
          {ingredient.name}
        </ListItem>
      );
    });
  };

  return <List dense>{createList()}</List>;
}

export default ExpandedSection;
