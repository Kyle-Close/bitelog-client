import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { Footer } from '../../components/footer';
import { Link } from 'react-router-dom';
import { GettingStarted } from './GettingStarted';
import { Features } from './Features';

function LandingPage() {
  return (
    <Box
      sx={{
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <Container sx={{ flexGrow: 1, my: '1rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <GettingStarted />
          <Divider />
          <Features />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}

export default LandingPage;
