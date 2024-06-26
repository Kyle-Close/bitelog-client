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
import { UserContext } from '../../context';
interface IGoogleAuthButton {
  isLogin: boolean;
}

function GoogleAuthButton({ isLogin }: IGoogleAuthButton) {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const { LoginUser } = useContext(UserContext);

  const googleSignIn = async (auth: Auth, provider: GoogleAuthProvider) => {
    try {
      const userCredential: UserCredential = await signInWithPopup(
        auth,
        provider
      );

      if (userCredential) {
        const { email, displayName, uid } = userCredential.user;
        if (!email || !displayName) return;

        LoginUser(auth, { email, username: displayName, uid, journalId: null });
        navigate(`/`);
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
      size='small'
    >
      {isLogin ? 'Login with Google' : 'Register with Google'}
    </Button>
  );
}

export default GoogleAuthButton;
