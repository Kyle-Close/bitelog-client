import { Box, Container, Paper, Typography } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context';

export function Footer() {
  const { user } = useContext(UserContext);
  return (
    <Paper elevation={6} sx={{ display: 'flex', borderRadius: 0, py: '1rem' }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: { xs: 0, md: '5rem' },
          mr: { xs: 0, md: '3rem' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Typography fontWeight='bold' color='primary' sx={{ flexGrow: 1 }}>
            BITELOG
          </Typography>
          <Typography fontSize='small'>© 2024 Bitelog</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography
              sx={{ textDecoration: 'underline' }}
              fontWeight='bold'
              fontSize='small'
            >
              Product
            </Typography>
            <Typography fontWeight={400} color='secondary' fontSize='small'>
              <Link to={`/user/${user?.uid}/journal/${user?.journalId}`}>
                Journal
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography
              sx={{ textDecoration: 'underline' }}
              fontWeight='bold'
              fontSize='small'
            >
              Support
            </Typography>
            <Typography fontWeight={400} color='secondary' fontSize='small'>
              <Link to={`/user/${user?.uid}/journal/${user?.journalId}`}>
                About
              </Link>
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Typography
              sx={{ textDecoration: 'underline' }}
              fontWeight='bold'
              fontSize='small'
            >
              Developer
            </Typography>
            <Typography fontWeight={400} color='secondary' fontSize='small'>
              <Link target='_blank' to='https://github.com/Kyle-Close'>
                Github
              </Link>
            </Typography>
            <Typography fontWeight={400} color='secondary' fontSize='small'>
              <Link
                target='_blank'
                to='https://www.linkedin.com/in/kyle-close/'
              >
                LinkedIn
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
}
