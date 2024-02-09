import { Box, Typography } from '@mui/material';

function EatEvent() {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#0B60B0',
        borderRadius: '0.5rem',
        px: '1rem',
        flexGrow: 1,
      }}
    >
      <Typography textAlign='center' sx={{ flexGrow: 1 }} alignSelf='center'>
        Hamburger + Fries
      </Typography>
    </Box>
  );
}

export default EatEvent;
