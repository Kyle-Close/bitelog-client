import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import { getAuth } from 'firebase/auth';
import axios from 'axios';

function LandingPage() {
  const user = useContext(UserContext);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchJWT = async () => {
      const authUser = getAuth().currentUser;
      if (authUser) {
        const token = await authUser.getIdToken();
        setJwtToken(token);
        if (token) {
          const res = await axios.get('http://localhost:8000');
          console.log(res);
        }
      }
    };

    if (user) {
      fetchJWT();
    }
  }, [user]); // Dependency array ensures this effect runs when `user` changes

  return (
    <Box>
      <Typography>{`My JWT Token: ${jwtToken}`}</Typography>
    </Box>
  );
}

export default LandingPage;
