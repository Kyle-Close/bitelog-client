import { Box, Button, Divider, Typography } from '@mui/material';
import { EatLogDataValue } from '../../HourContainerList';
import { formatISO8601ToReadableDate } from '../../../helpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequestToBackend } from '../../../../../helpers/utility';
import { BASE_URL } from '../../../../../config/axiosConfig';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../../context';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Loading } from '../../../../../components/generic/Loading';
import { EatLogTable } from './EatLogTable';
import { SchedulerModal } from '../../../modals/SchedulerModal';
import {
  IFoods,
  useFetchUserFood,
} from '../../../../../hooks/useFetchUserFood';

interface Eat {
  data: EatLogDataValue;
}

function Eat({ data }: Eat) {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const userFoods = useFetchUserFood(user);
  const queryClient = useQueryClient();
  const eventTimeText = formatISO8601ToReadableDate(data.logTimestamp);

  const fetchEatLogQuery = useQuery({
    queryKey: ['eatLogs', data.id],
    queryFn: () =>
      makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/eat_logs/${data.id}`,
      }),
    enabled: !!user,
  });

  const deleteEatLogMutation = useMutation({
    mutationKey: ['eatLogs', user?.uid],
    mutationFn: () => deleteEatLog(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['eatLogs', user?.uid],
      });
    },
  });

  if (fetchEatLogQuery.isLoading || fetchEatLogQuery.isError)
    return <Loading />;

  if (!userFoods || !userFoods.foods) return;

  const foodDataForTable = getFoodDataForTable(
    fetchEatLogQuery.data.eatLogDataValues.UserFoods,
    userFoods.foods
  );

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    deleteEatLogMutation.mutate();
  };

  const deleteEatLog = async () => {
    if (!user || !user.uid) return;
    try {
      await makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/eat_logs/${data.id}`,
        method: 'DELETE',
      });
    } catch (err) {
      throw err;
    }
  };

  return (
    <>
      {isEditing && (
        <SchedulerModal
          isOpen={isEditing}
          handleClose={() => setIsEditing(false)}
          isUpdating={true}
          initialEatLogState={{
            autoCompleteValue: null,
            inputValue: '',
            selectedFoods: foodDataForTable,
            note: data.notes,
            dateTime: new Date(data.logTimestamp),
          }}
          logId={data.id}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          p: '2rem',
        }}
      >
        <Typography variant='h5'>Eat Log</Typography>
        <Divider />
        {isDeleting ? (
          <>
            <Typography align='center' fontWeight='bold'>
              Are you sure you want to delete this eat log entry? This action
              cannot be undone.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '1rem',
                mt: '1rem',
                justifyContent: 'center',
              }}
            >
              <Button
                onClick={() => handleConfirmDelete()}
                color='error'
                variant='contained'
              >
                Confirm Delete
              </Button>
              <Button
                onClick={() => setIsDeleting(false)}
                variant='contained'
                color='secondary'
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ mt: '1rem' }} fontSize='large'>
              {eventTimeText}
            </Typography>
            <EatLogTable foodData={foodDataForTable} />

            {data.notes && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  mt: '1rem',
                  py: '0.5rem',
                  px: '1rem',
                  backgroundColor: '#434343',
                }}
              >
                <>
                  <Typography fontWeight='600'>Notes:</Typography>
                  <Typography>{data.notes}</Typography>
                </>
              </Box>
            )}
            <Box sx={{ mt: '1rem', display: 'flex', gap: '1rem' }}>
              <Button
                onClick={() => setIsEditing(true)}
                sx={{ flexGrow: 2 }}
                color='secondary'
                variant='contained'
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteClick()}
                sx={{ flexGrow: 1, fontWeight: 'bold' }}
                color='error'
                variant='contained'
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}

export default Eat;

interface UserFood {
  EatLogUserFoods: {
    EatLogId: number;
    UserFoodId: number;
    quantity: number;
  };
  UserId: string;
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}
const getFoodDataForTable = (logFoodList: UserFood[], userFoods: IFoods[]) => {
  return logFoodList.map((food) => {
    return {
      name: food.name,
      id: food.id,
      quantity: food.EatLogUserFoods.quantity,
      updatedAt: food.updatedAt,
      createdAt: food.createdAt,
      ingredients: getFoodIngredients(food.id, userFoods),
    };
  });
};

const getFoodIngredients = (foodId: number, userFoods: IFoods[]) => {
  const food = userFoods.find((food) => food.id === foodId);
  if (food) return food.ingredients;
  else return [];
};
