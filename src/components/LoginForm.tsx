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
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ForgotPasswordModal from './ForgotPasswordModal';
import { useNavigate } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

function LoginForm() {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<string[] | null>(null);
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const googleSignIn = async (auth: Auth, provider: GoogleAuthProvider) => {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );
      console.log(userCredential);
      if (userCredential) {
        const credential: OAuthCredential | null =
          GoogleAuthProvider.credentialFromResult(userCredential);

        console.log('credential: ', credential);
        if (credential) {
          //const token = credential.accessToken;
          navigate('/');
          // The signed-in user info.
          //const user = userCredential.user;

          //console.log(`token: ${token}`);
          //console.dir(userCredential);
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

  const handleFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    auth: Auth
  ) => {
    e.preventDefault();

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
      console.log(user);
      //const token = await user.getIdToken();

      setErrors(null);
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

  useEffect(() => {
    const { email, password } = formData;
    if (email && password) setSubmitEnabled(true);
    else setSubmitEnabled(false);
  }, [formData]);

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
          disabled={!submitEnabled}
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
  );
}

export default LoginForm;
