import { Box, Button, IconButton, Typography } from '@mui/material';
import { EatLogDataValue } from '../../HourContainerList';
import { formatISO8601ToReadableDate } from '../../../helpers';
import { useQuery } from '@tanstack/react-query';
import { makeRequestToBackend } from '../../../../../helpers/utility';
import { BASE_URL } from '../../../../../config/axiosConfig';
import { useContext } from 'react';
import { UserContext } from '../../../../../contexts';
import FoodIngredientList from './FoodIngredientList';
import EditIcon from '@mui/icons-material/Edit';

interface Eat {
  data: EatLogDataValue;
}

function Eat({ data }: Eat) {
  const { user } = useContext(UserContext);
  const eventTimeText = formatISO8601ToReadableDate(data.logTimestamp);

  const query = useQuery({
    queryKey: ['eat_log', data.id],
    queryFn: () =>
      makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/eat_logs/${data.id}`,
      }),
    enabled: !!user,
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <Typography fontSize='large'>
        <Box fontWeight='600' component='span'>
          {'Event Time: '}
        </Box>
        {eventTimeText}
      </Typography>
      <FoodIngredientList query={query} />
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
      <Button sx={{ mt: '1rem' }} color='secondary' variant='contained' startIcon={<EditIcon />}>
        Edit
      </Button>
    </Box>
  );
}

export default Eat;
