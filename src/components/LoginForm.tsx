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

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const [formData, setFormData] = useState<LoginFormData | null>(null);

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
    const target = e.target;
    console.log(target);
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '4rem',
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
        <Button variant='contained'>Login</Button>
        <Typography paragraph fontSize='small'>
          Don't have an account? <Link href='#'>Create one now.</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
