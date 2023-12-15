import { Button } from '@mui/material';

function LoggedInButtons() {
  return (
    <>
      <Button href='/login' size='small' variant='outlined' color='error'>
        Logout
      </Button>
    </>
  );
}

export default LoggedInButtons;
