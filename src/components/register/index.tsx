import { Box, Divider, Typography } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../contexts';
import GoogleAuthButton from '../login/GoogleSignInButton';
import RegisterFormContent from './RegisterFormContents';
import useAuthForm from '../../hooks/useAuthForm';

function Register() {
  const { user } = useContext(UserContext);
  const { handleRegisterSubmit, handleUpdate, errors, isSubmitEnabled } =
    useAuthForm();

  return user === null ? (
    <Box sx={loggedOutFormWrapper}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Typography variant='h6'>Register a new account</Typography>
        <GoogleAuthButton isLogin={false} />
        <Divider>OR</Divider>
      </Box>

      <RegisterFormContent
        handleFormSubmit={handleRegisterSubmit}
        handleFormUpdate={handleUpdate}
        errors={errors}
        isSubmitEnabled={isSubmitEnabled}
      />
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
  px: '4rem',
  alignSelf: 'center',
};

const loggedInFormWrapper = {
  display: 'flex',
  justifyContent: 'center',
  pt: '2rem',
  flex: 1,
};
