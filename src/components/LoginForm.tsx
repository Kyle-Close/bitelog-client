import {
  Box,
  Typography,
  Button,
  Divider,
  Input,
  Link,
  ListItem,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  Auth,
  OAuthCredential,
} from 'firebase/auth';
import { UserCredential } from 'firebase/auth/cordova';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ForgotPasswordModal from './ForgotPasswordModal';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[] | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const googleSignIn = async (auth: Auth, provider: GoogleAuthProvider) => {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );
      if (userCredential) {
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(userCredential);

        if (credential) {
          const token = credential.accessToken;
          // The signed-in user info.
          //const user = userCredential.user;

          console.log(`token: ${token}`);
          console.dir(userCredential);
        }
      }
    } catch (err: any) {
      console.log(err.code);
    }
  };

  const handleFormUpdate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (errors && errors.length > 0) {
      setErrors(null);
    }

    const inputField = e.target.id;
    const value = e.target.value;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [inputField]: value,
      };
    });
  };

  const handleFormSubmit = async (auth: Auth) => {
    if (!formData.email || !formData.password) {
      setErrors(['All fields must be filled out.']);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;
      const token = await user.getIdToken();

      //setErrors(null);

      setErrors(['this is a test']);
      console.log(`token: ${token}`);
      console.dir(user);
    } catch (err: any) {
      const errorMessage = err.message;
      const regex: RegExp = /(?<=\()(.*)(?=\))/;
      const match: RegExpExecArray | null = regex.exec(errorMessage);

      if (match) {
        const errorBetweenParenthesis = match[0];
        const authErrorSplit = errorBetweenParenthesis.split('/');

        if (authErrorSplit.length > 1) {
          setErrors([authErrorSplit[1]]);
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

  return (
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
      <Button
        onClick={() => googleSignIn(auth, provider)}
        variant='outlined'
        startIcon={<GoogleIcon />}
      >
        Login with Google
      </Button>
      <Divider>OR</Divider>
      <Box
        role='form'
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
            type='submit'
            id='forgot-password-button'
            onClick={handleOpen}
            size='small'
            sx={{ fontSize: '0.7rem' }}
          >
            Forgot Password?
          </Button>
        </Box>

        <Button
          id='login-form-submit'
          onClick={() => handleFormSubmit(auth)}
          variant='contained'
        >
          Login
        </Button>
        <Typography paragraph fontSize='small'>
          Don't have an account? <Link href='/register'>Create one now.</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
