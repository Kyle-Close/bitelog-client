import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LoggedOutButtons() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => navigate('/login')}
        size='small'
        variant='outlined'
      >
        Login
      </Button>
      <Button
        onClick={() => navigate('/register')}
        size='small'
        variant='contained'
      >
        Register
      </Button>
    </>
  );
}

export default LoggedOutButtons;
