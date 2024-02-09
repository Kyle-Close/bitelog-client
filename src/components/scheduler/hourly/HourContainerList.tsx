import { Box, Typography } from '@mui/material';

function HourContainerList() {
  const List = () => {
    // The individual containers for each hour. There will be 24.
    const containerList: React.ReactNode[] = [];
    for (let i = 0; i < 24; i++) {
      const displayHour = i < 10 ? `0${i}` : i;
      const displayMinutes = '00';
      const displayFullTime = displayHour + ':' + displayMinutes;

      const container = (
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            minHeight: '5rem',
            backgroundColor: '#707070',
            px: '1rem',
            gap: '1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              borderRight: '0.15rem solid #121212',
              pr: '1rem',
            }}
          >
            <Typography variant='h4'>{displayFullTime}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexGrow: 1,
            }}
          >
            Events
          </Box>
        </Box>
      );
      containerList.push(container);
    }
    return containerList;
  };
  return <>{List()}</>;
}

export default HourContainerList;
