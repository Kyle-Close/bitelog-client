import { Box, Typography } from '@mui/material';

interface EventEntry {
  type: 'eat' | 'event';
  title: string;
}

function EventEntry({ type, title }: EventEntry) {
  const eventBackgroundColor = type === 'eat' ? '#0B60B0' : '#ff7700';

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: eventBackgroundColor,
        borderRadius: '0.5rem',
        px: '1rem',
        flexGrow: 1,
      }}
    >
      <Typography
        fontWeight='bold'
        textAlign='center'
        sx={{ flexGrow: 1 }}
        alignSelf='center'
      >
        {title}
      </Typography>
    </Box>
  );
}

export default EventEntry;
