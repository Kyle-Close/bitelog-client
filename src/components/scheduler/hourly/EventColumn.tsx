import { Box, Typography } from '@mui/material';

function EventColumn() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'repeat(4, 1fr)',
      }}
    >
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#0288d1',
            opacity: '0.85',
            borderTopRightRadius: '2rem',
            borderBottomRightRadius: '2rem',
            px: '1rem',
          }}
        >
          <Typography alignSelf='center'>Hamburger + Fries</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: '#0288d1',
            opacity: '0.85',
            borderTopRightRadius: '2rem',
            borderBottomRightRadius: '2rem',
            px: '1rem',
          }}
        >
          <Typography alignSelf='center'>Hamburger + Fries</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default EventColumn;
