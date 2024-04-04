import { Box, Button, Divider, Typography } from '@mui/material';
import { EatLogDataValue } from '../../HourContainerList';
import { formatISO8601ToReadableDate } from '../../../helpers';
import { useQuery } from '@tanstack/react-query';
import { makeRequestToBackend } from '../../../../../helpers/utility';
import { BASE_URL } from '../../../../../config/axiosConfig';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../../context';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Loading } from '../../../../../components/generic/Loading';
import { EatLogTable } from './EatLogTable';

interface Eat {
  data: EatLogDataValue;
}

function Eat({ data }: Eat) {
  const { user } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const eventTimeText = formatISO8601ToReadableDate(data.logTimestamp);

  const query = useQuery({
    queryKey: ['eat_log', data.id],
    queryFn: () =>
      makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/eat_logs/${data.id}`,
      }),
    enabled: !!user,
  });

  if (query.isLoading || query.isError) return <Loading />;

  const foodDataForTable = getFoodDataForTable(
    query.data.eatLogDataValues.UserFoods
  );

  const handleDeleteClick = (foodId: number) => {
    setIsDeleting(true);
  };

  return (
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
            <Button color='error' variant='contained'>
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
            <Typography fontWeight='600'>Notes:</Typography>
            <Typography>{data.notes}</Typography>
          </Box>
          <Box sx={{ mt: '1rem', display: 'flex', gap: '1rem' }}>
            <Button
              sx={{ flexGrow: 2 }}
              color='secondary'
              variant='contained'
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={(e) => handleDeleteClick(data.id)}
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
const getFoodDataForTable = (rawData: UserFood[]) => {
  return rawData.map((data) => {
    return {
      name: data.name,
      id: data.id,
      quantity: data.EatLogUserFoods.quantity,
    };
  });
};
