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
        borderRight: 'solid 0.25rem #59616f',
        pr: '1rem',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem', lg: '2rem' },
        }}
        color={isCurrentHour ? 'primary' : ''}
        variant='h4'
      >
        {displayFullTime}
      </Typography>
    </Box>
  );
}

export default TimeColumn;
