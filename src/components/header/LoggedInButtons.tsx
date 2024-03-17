import { Button, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { getAuth, signOut } from 'firebase/auth';

export function LoggedInButtons() {
  const auth = getAuth();
  return (
    <>
      <IconButton onClick={() => signOut(auth)} color='error' size='large'>
        <LogoutIcon />
      </IconButton>
    </>
  );
}

export default LoggedInButtons;
