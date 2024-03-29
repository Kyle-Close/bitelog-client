import { Box, Typography, Divider } from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from '../../../context';
import GoogleAuthButton from '../GoogleAuthButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import LoginFormContent from './LoginFormContent';
import useLoginForm from '../../../hooks/useLoginForm';

export default function LoginForm() {
  const { handleUpdate, handleLoginSubmit, errors, isSubmitEnabled } = useLoginForm();

  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return user === null ? (
    <Box sx={loggedOutFormWrapper}>
      {open && <ForgotPasswordModal open={open} setOpen={setOpen} />}
      <Typography variant='h6'>Login to your account</Typography>
      <GoogleAuthButton isLogin={true} />
      <Divider>OR</Divider>
      <LoginFormContent
        handleFormSubmit={handleLoginSubmit}
        handleFormUpdate={handleUpdate}
        errors={errors}
        handleOpen={handleOpen}
        isSubmitEnabled={isSubmitEnabled}
      />
    </Box>
  ) : (
    <Box sx={loggedInFormWrapper}>
      <Typography variant='h6'>You are already logged in.</Typography>
    </Box>
  );
}

const loggedOutFormWrapper = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  px: '4rem',
  alignSelf: 'center',
};

const loggedInFormWrapper = {
  display: 'flex',
  justifyContent: 'center',
  pt: '2rem',
  flex: 1,
};
