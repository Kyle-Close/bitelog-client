import { Box, Typography } from '@mui/material';
import { Footer } from '../../components/footer';

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
      <Box sx={{ flexGrow: 1 }}>
        Not sure what I'm doing with the home page yet. TBD...
      </Box>
      <Footer />
    </Box>
  );
}

export default LandingPage;
