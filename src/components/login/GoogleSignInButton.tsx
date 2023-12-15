import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  Auth,
  UserCredential,
} from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts';

function GoogleSignInButton() {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const { setUser } = useContext(UserContext);

  const googleSignIn = async (auth: Auth, provider: GoogleAuthProvider) => {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );

      if (userCredential) {
        const { email, displayName } = userCredential.user;
        if (!email || !displayName) return;

        setUser({ email, username: displayName });
        navigate('/');
      }
    } catch (err: any) {
      console.log(err.code);
    }
  };
  return (
    <Button
      onClick={() => googleSignIn(auth, provider)}
      variant='outlined'
      startIcon={<GoogleIcon />}
    >
      Login with Google
    </Button>
  );
}

export default GoogleSignInButton;
