import {
  Box,
  Typography,
  Button,
  Divider,
  Input,
  Link,
  ListItem,
} from '@mui/material';
import { getAuth, Auth } from 'firebase/auth';
import { useState, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts';
import GoogleSignInButton from './GoogleSignInButton';
import ForgotPasswordModal from './ForgotPasswordModal';
import useAuthForm from '../../hooks/useAuthForm';

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
  const auth = getAuth();

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
      console.dir(err);
      const errorMessage = err.message;
      const regex: RegExp = /(?<=\()(.*)(?=\))/;
      const match: RegExpExecArray | null = regex.exec(errorMessage);

      if (match) {
        const errorBetweenParenthesis = match[0];
        const authErrorSplit = errorBetweenParenthesis.split('/');

        if (authErrorSplit.length > 1) {
          console.log('invalid');
          const displayErrorMsg = authErrorSplit[1];
          addError(displayErrorMsg);
        }
      }
    }
  };

  const displayErrorMessages = (errors: string[]) => {
    return errors.map((errorMsg, key) => (
      <ListItem key={key} sx={{ padding: 0, fontSize: '0.8rem', color: 'red' }}>
        {errorMsg}
      </ListItem>
    ));
  };

  return !user ? (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '4rem',
        alignSelf: 'center',
      }}
    >
      {open && <ForgotPasswordModal open={open} setOpen={setOpen} />}
      <Typography variant='h6'>Login to your account</Typography>
      <GoogleSignInButton />
      <Divider>OR</Divider>
      <Box
        onSubmit={(e) => handleFormSubmit(e, auth)}
        component='form'
        id='login-form'
        sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <Input
          type='text'
          name='email'
          aria-label='account email'
          onChange={handleFormUpdate}
          placeholder='Email Address'
          id='email'
        />
        <Input
          name='password'
          onChange={handleFormUpdate}
          placeholder='Password'
          id='password'
          type='password'
          required
        />
        {errors && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {displayErrorMessages(errors)}
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            id='forgot-password-button'
            onClick={handleOpen}
            size='small'
            sx={{ fontSize: '0.7rem' }}
          >
            Forgot Password?
          </Button>
        </Box>

        <Button
          disabled={!isSubmitEnabled}
          id='login-form-submit'
          variant='contained'
          type='submit'
        >
          Login
        </Button>
        <Typography paragraph fontSize='small'>
          Don't have an account? <Link href='/register'>Create one now.</Link>
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', pt: '2rem', flex: 1 }}
    >
      <Typography variant='h6'>You are already logged in.</Typography>
    </Box>
  );
}

export default LoginForm;
