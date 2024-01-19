import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import { getAuth } from 'firebase/auth';
import { BASE_URL } from '../config/axiosConfig';
import { useQuery } from '@tanstack/react-query';

const fetchIngredients = async () => {
  const url = BASE_URL + '/ingredients';
  const res = await fetch(url);
  return res.json();
};

function LandingPage() {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  });

  console.log(data.ingredients);

  const user = useContext(UserContext);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchJWT = async () => {
      const authUser = getAuth().currentUser;
      if (authUser) {
        const token = await authUser.getIdToken();
        setJwtToken(token);
      }
    };

    if (user) {
      fetchJWT();
    }
  }, [user]); // Dependency array ensures this effect runs when `user` changes

  return (
    <Box>
      <Typography>{`My JWT Token: ${jwtToken}`}</Typography>
      <Box sx={{ pt: '4rem', pl: '2rem', border: '2px solid red' }}>
        {isError && 'Error fetching data'}
        {isLoading && 'Loading...'}
        {!isError &&
          !isLoading &&
          data.ingredients.map((ing: { id: Number; name: string }) => ing.name)}
      </Box>
    </Box>
  );
}

export default LandingPage;
