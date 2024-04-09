import { Box, Container, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';

export function Footer() {
  const { user } = useContext(UserContext);
  return (
    <Paper
      elevation={6}
      sx={{
        display: 'flex',
        borderRadius: 0,
        py: '1rem',
      }}
    >
      <Container
        maxWidth='lg'
        sx={{
          fontSize: { xs: '0.8rem', sm: '1rem', lg: '1.1rem' },
          display: 'flex',
          justifyContent: 'space-between',
          gap: { xs: 0, md: '5rem' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Typography
            fontWeight='bold'
            color='primary'
            sx={{ flexGrow: 1, fontSize: 'inherit' }}
          >
            BITELOG
          </Typography>
          <Typography fontSize='small'>© 2024 Bitelog</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography
              sx={{ textDecoration: 'underline' }}
              fontWeight='bold'
              fontSize='inherit'
            >
              Product
            </Typography>
            <Link to={`/user/${user?.uid}/journal/${user?.journalId}`}>
              <Typography fontWeight={400} color='secondary' fontSize='inherit'>
                Journal
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography
              sx={{ textDecoration: 'underline' }}
              fontWeight='bold'
              fontSize='inherit'
            >
              Support
            </Typography>
            <Link to={`/user/${user?.uid}/journal/${user?.journalId}`}>
              <Typography fontWeight={400} color='secondary' fontSize='inherit'>
                About
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography
              sx={{ textDecoration: 'underline' }}
              fontWeight='bold'
              fontSize='inherit'
            >
              Developer
            </Typography>
            <Link target='_blank' to='https://github.com/Kyle-Close'>
              <Typography fontWeight={400} color='secondary' fontSize='inherit'>
                Github
              </Typography>
            </Link>
            <Link target='_blank' to='https://www.linkedin.com/in/kyle-close/'>
              <Typography fontWeight={400} color='secondary' fontSize='inherit'>
                LinkedIn
              </Typography>
            </Link>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
