import { Box, Button, Divider, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EventLogDataValue } from '../../../helpers';
import { formatISO8601ToReadableDate } from '../../../helpers';
import { useContext, useState } from 'react';
import { UserContext } from '../../../../../context';
import { makeRequestToBackend } from '../../../../../helpers/utility';
import { BASE_URL } from '../../../../../config/axiosConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SchedulerModal } from '../../../modals/SchedulerModal';

interface Event {
  data: EventLogDataValue;
}

function Event({ data }: Event) {
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const eventTimeText = formatISO8601ToReadableDate(data.logTimestamp);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const deleteEventMutation = useMutation({
    mutationKey: ['eventLogs', user?.uid],
    mutationFn: () => deleteEventLog(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['eventLogs', user?.uid],
      });
    },
  });

  const deleteEventLog = async () => {
    if (!user || !user.uid) return;
    try {
      await makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/journal/${user?.journalId}/report_logs/${data.id}`,
        method: 'DELETE',
      });
    } catch (err) {
      throw err;
    }
  };

  const handleConfirmDelete = () => {
    deleteEventMutation.mutate();
  };

  return (
    <>
      {isEditing && (
        <SchedulerModal
          activeTab={1}
          isOpen={isEditing}
          handleClose={() => setIsEditing(false)}
          isUpdating={true}
          logId={data.id}
          initialEventState={{
            discomfortLevel: Number(data.discomfortRating),
            note: data.notes,
            timeStamp: new Date(data.logTimestamp),
          }}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          p: '2rem',
        }}
      >
        <Typography variant='h5'>Event</Typography>
        <Divider />
        {isDeleting ? (
          <>
            <Typography align='center' fontWeight='bold'>
              Are you sure you want to delete this event entry? This action
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
            <Typography fontWeight={600} sx={{ mt: '1rem' }} fontSize='large'>
              Event Time:{' '}
              <Typography component='span' fontWeight={400}>
                {eventTimeText}
              </Typography>
            </Typography>
            {data.discomfortRating && (
              <Typography
                fontSize='large'
                sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <Box fontWeight='600' component='span'>
                  Discomfort Rating:{' '}
                  <Typography component='span' fontWeight={400}>
                    {data.discomfortRating}/5
                  </Typography>
                </Box>
              </Typography>
            )}
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

            <Box sx={{ display: 'flex', gap: '1rem' }}>
              <Button
                onClick={() => setIsEditing(true)}
                sx={{ mt: '1rem', flexGrow: 2 }}
                color='secondary'
                variant='contained'
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                onClick={() => setIsDeleting(true)}
                sx={{ mt: '1rem', flexGrow: 1 }}
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

export default Event;
