import { Box, Typography, Button, Divider, Input, Link } from '@mui/material';
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

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

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
          const user = userCredential.user;

          console.log(`token: ${token}`);
          console.dir(userCredential);
        }
      }
    } catch (err: any) {
      console.log(err.code);
    }
  };

  const handleFormUpdate: React.ChangeEventHandler<HTMLInputElement> = (e) => {
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
    if (!formData.email || !formData.password)
      // TODO: handle error msgs
      return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (!userCredential) return; // TODO: handle error msg

      const user = userCredential.user;
      const token = await user.getIdToken();

      console.log(`token: ${token}`);
      console.dir(user);
    } catch (err) {
      console.log(err);
    }
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
        component='form'
        sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <Input
          onChange={handleFormUpdate}
          placeholder='Email Address'
          id='email'
        />
        <Input
          onChange={handleFormUpdate}
          placeholder='Password'
          id='password'
          type='password'
          required
        />
        <Link href='#' underline='none' fontSize='small' alignSelf='end'>
          Forgot Password?
        </Link>
        <Button onClick={() => handleFormSubmit(auth)} variant='contained'>
          Login
        </Button>
        <Typography paragraph fontSize='small'>
          Don't have an account? <Link href='#'>Create one now.</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
