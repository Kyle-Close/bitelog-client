import { Button } from '@mui/material';

import { getAuth, signOut } from 'firebase/auth';

function LoggedInButtons() {
  const auth = getAuth();
  return (
    <>
      <Button
        onClick={() => signOut(auth)}
        size='small'
        variant='outlined'
        color='error'
      >
        Logout
      </Button>
    </>
  );
}

export default LoggedInButtons;
