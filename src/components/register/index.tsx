import { Box, Divider, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import GoogleAuthButton from '../login/GoogleSignInButton';

function Register() {
  const { user } = useContext(UserContext);

  return user === null ? (
    <Box sx={loggedOutFormWrapper}>
      <Typography variant='h6'>Register</Typography>
      <GoogleAuthButton isLogin={false} />
      <Divider>OR</Divider>
      form here
    </Box>
  ) : (
    <Box sx={loggedInFormWrapper}>
      <Typography variant='h6'>You are already logged in.</Typography>
    </Box>
  );
}

export default Register;

const loggedOutFormWrapper = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  padding: '4rem',
  alignSelf: 'center',
};

const loggedInFormWrapper = {
  display: 'flex',
  justifyContent: 'center',
  pt: '2rem',
  flex: 1,
};
