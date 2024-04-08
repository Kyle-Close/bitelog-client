import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import JournalImg from '../../assets/journal.png';

export function GettingStarted() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem', lg: '1.2rem' },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h5'>Discover a Happier Gut:</Typography>
          <Typography variant='h6'>
            Track, Learn & Adjust Your Diet with Bitelog
          </Typography>
        </Box>
        <Typography
          fontSize='inherit'
          fontWeight={300}
          sx={{ flexGrow: 1, mt: '1rem' }}
        >
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
      </Box>
      <Box
        component='img'
        src={JournalImg}
        sx={{ maxWidth: '300px', opacity: '80%' }}
      />
    </Box>
  );
}
