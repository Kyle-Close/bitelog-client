import { Box, Divider, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context';
import GoogleAuthButton from '../GoogleAuthButton';
import RegisterFormContent from './RegisterFormContents';
import useRegisterForm from '../../../hooks/useRegisterForm';
import ValidationEmailModal from './ValidationEmailModal';

function Register() {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => setIsOpen(false);

  const { handleRegisterSubmit, handleUpdate, errors, isSubmitEnabled } = useRegisterForm(handleOpen);

  return user === null ? (
    <Box sx={loggedOutFormWrapper}>
      <ValidationEmailModal isOpen={isOpen} handleClose={handleClose} />
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
