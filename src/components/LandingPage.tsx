import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import { getAuth } from 'firebase/auth';
import { useQuery } from '@tanstack/react-query';

function LandingPage() {
  return (
    <Box>
      <Typography>
        Not sure what I'm doing with the home page yet. TBD...
      </Typography>
    </Box>
  );
}

export default LandingPage;
