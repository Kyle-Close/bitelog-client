import { Box, Typography } from '@mui/material';

interface EatEvent {
  title: string;
}

function EatEvent({ title }: EatEvent) {
  return (
    <Box
      sx={{
        display: 'flex',
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

export default EatEvent;
