import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  Auth,
  OAuthCredential,
  UserCredential,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function GoogleSignInButton() {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

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
          // TO-DO Store user info into context

          navigate('/');
        }
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
