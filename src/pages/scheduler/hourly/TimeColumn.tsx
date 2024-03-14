import { Box, Typography } from '@mui/material';

interface TimeColumn {
  isCurrentHour: boolean;
  displayFullTime: string;
}

function TimeColumn({ isCurrentHour, displayFullTime }: TimeColumn) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        borderRight: '0.15rem solid #121212',
        pr: '1rem',
      }}
    >
      <Typography color={isCurrentHour ? 'gold' : ''} variant='h4'>
        {displayFullTime}
      </Typography>
    </Box>
  );
}

export default TimeColumn;
