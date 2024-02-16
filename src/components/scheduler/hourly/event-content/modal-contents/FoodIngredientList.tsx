import { Box, Typography } from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';

interface FoodIngredientList {
  query: UseQueryResult<any, Error>;
}

interface EatLogUserFood {
  quantity: number;
  EatLogId: number;
  UserFoodId: number;
}

interface UserFood {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  EatLogUserFoods: EatLogUserFood;
}

function FoodIngredientList({ query }: FoodIngredientList) {
  if (query.isLoading || query.isPending) {
    return <Typography>Loading...</Typography>;
  }
  if (query.error) {
    return <Typography>Error fetching ingredients</Typography>;
  }

  const userFoods = query.data.eatLogDataValues.UserFoods as UserFood[];
  const foodNames = userFoods.map((food) => food.name);
  let foodsString = '';
  foodNames.forEach((name, index) => {
    if (index + 1 === userFoods.length) foodsString += name;
    else foodsString += `${name}, `;
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography fontSize='large' fontWeight='600'>
        {'Foods: '}
        <Box fontWeight='400' component='span'>
          {foodsString}
        </Box>
      </Typography>
    </Box>
  );
}

export default FoodIngredientList;
