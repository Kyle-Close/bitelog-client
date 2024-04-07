import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export function GettingStarted() {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h6'>Discover a Happier Gut:</Typography>
        <Typography variant='h6'>
          Track, Learn & Adjust Your Diet with Bitelog
        </Typography>
      </Box>
      <Typography fontWeight={300}>
        Track your meals, identify patterns, and eliminate guesswork in your
        quest for dietary well-being.
      </Typography>
      <Box
        sx={{
          mt: '0.5rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        <Button variant='contained' sx={{ borderRadius: '32px' }}>
          Get Started
        </Button>
        <Link to={''}>Learn More</Link>
      </Box>
    </>
  );
}
