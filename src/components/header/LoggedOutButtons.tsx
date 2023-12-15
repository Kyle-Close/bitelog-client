import { Button } from '@mui/material';

function LoggedOutButtons() {
  return (
    <>
      <Button href='/login' size='small' variant='outlined'>
        Login
      </Button>
      <Button href='/register' size='small' variant='contained'>
        Register
      </Button>
    </>
  );
}

export default LoggedOutButtons;
