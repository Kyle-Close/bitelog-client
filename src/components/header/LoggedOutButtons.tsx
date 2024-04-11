import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { BASE_CLIENT_URL } from '../../config/axiosConfig';

function LoggedOutButtons() {
  // TODO: put below logic into a custom hook. Use the hook with log out btn after
  const navigate = useNavigate();
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('xs'));
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  let buttonSize: 'small' | 'medium' | 'large';
  if (isXs) {
    buttonSize = 'small';
  } else if (isSm) {
    buttonSize = 'small';
  } else if (isMd) {
    buttonSize = 'small';
  } else {
    buttonSize = 'medium';
  }

  return (
    <>
      <Button
        onClick={() => navigate(`/${BASE_CLIENT_URL}/login`)}
        size={buttonSize}
        variant='outlined'
      >
        Login
      </Button>
      <Button
        onClick={() => navigate(`/${BASE_CLIENT_URL}/register`)}
        size={buttonSize}
        variant='contained'
      >
        Register
      </Button>
    </>
  );
}

export default LoggedOutButtons;
