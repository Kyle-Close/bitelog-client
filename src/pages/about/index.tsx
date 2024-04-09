import { Box, Container } from '@mui/material';
import { Welcome } from './sections/Welcome';
import { Story } from './sections/Story';
import { HowItWorks } from './sections/HowItWorks';
import { Future } from './sections/Future';
import { Footer } from '../../components/footer';

export function About() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Container maxWidth='lg' sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            my: '2rem',
          }}
        >
          <Welcome />
          <Story />
          <HowItWorks />
          <Future />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
