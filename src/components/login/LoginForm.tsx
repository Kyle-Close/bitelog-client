import { Box, Typography, Divider } from '@mui/material';
import { Auth } from 'firebase/auth';
import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts';
import GoogleSignInButton from './GoogleSignInButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import useAuthForm from '../../hooks/useAuthForm';
import LoginFormContent from './LoginFormContent';

function LoginForm() {
  const [
    formData,
    handleFormUpdate,
    errors,
    addError,
    clearErrors,
    isSubmitEnabled,
  ] = useAuthForm();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    auth: Auth
  ) => {
    e.preventDefault();
    if (!formData) return;

    if (!formData.email || !formData.password) {
      addError('All fields must be filled out.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // TO-DO store user data in context
      console.log(userCredential);
      clearErrors();
      navigate('/');
    } catch (err: any) {
      const errorMessage = err.message;
      const regex: RegExp = /(?<=\()(.*)(?=\))/;
      const match: RegExpExecArray | null = regex.exec(errorMessage);

      if (match) {
        const errorBetweenParenthesis = match[0];
        const authErrorSplit = errorBetweenParenthesis.split('/');

        if (authErrorSplit.length > 1) {
          const displayErrorMsg = authErrorSplit[1];
          addError(displayErrorMsg);
        }
      }
    }
  };

  return user === null ? (
    <Box sx={loggedOutFormWrapper}>
      {open && <ForgotPasswordModal open={open} setOpen={setOpen} />}
      <Typography variant='h6'>Login to your account</Typography>
      <GoogleSignInButton />
      <Divider>OR</Divider>
      <LoginFormContent
        handleFormSubmit={handleFormSubmit}
        handleFormUpdate={handleFormUpdate}
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
  padding: '4rem',
  alignSelf: 'center',
};

const loggedInFormWrapper = {
  display: 'flex',
  justifyContent: 'center',
  pt: '2rem',
  flex: 1,
};

export default LoginForm;
