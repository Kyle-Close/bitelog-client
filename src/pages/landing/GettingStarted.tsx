import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import JournalImg from '../../assets/journal.png';
import { useScreenSize } from '../../hooks/useScreenSize';
import { useContext } from 'react';
import { UserContext } from '../../context';

export function GettingStarted() {
  const { user } = useContext(UserContext);
  const screenSize = useScreenSize();
  const isMobile = screenSize === 'xs' || screenSize === 'sm';
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        fontSize: {
          xs: '0.9rem',
          sm: '1rem',
          md: '1.1rem',
          lg: '1.2rem',
          xl: '1.3rem',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography
            color='primary'
            variant='h5'
            fontSize={{
              xs: '1.5rem',
              sm: '1.6rem',
              md: '1.7rem',
              lg: '1.8rem',
            }}
          >
            Discover a Happier Gut:
          </Typography>
          <Typography
            variant='h6'
            fontSize={{
              xs: '1.2rem',
              sm: '1.3rem',
              md: '1.4rem',
              lg: '1.5rem',
            }}
          >
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
            mt: '1rem',
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => {
              navigate(`/user/${user?.uid}/journal/${user?.journalId}`);
            }}
            variant='contained'
            sx={{
              borderRadius: '32px',
              fontSize: { xs: '0.75rem', lg: '0.9rem' },
            }}
          >
            Get Started
          </Button>
          <Link to={''}>
            <Typography
              color='secondary'
              sx={{ textDecoration: 'underline', fontSize: { xs: '0.9rem' } }}
            >
              Learn More
            </Typography>
          </Link>
        </Box>
      </Box>
      {!isMobile && (
        <Box
          component='img'
          src={JournalImg}
          sx={{ maxWidth: '300px', opacity: '80%' }}
        />
      )}
    </Box>
  );
}
