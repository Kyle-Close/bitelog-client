import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

interface IGoToHome {
  url: string;
}

function GoToHome({ url }: IGoToHome) {
  return (
    <Link to={url}>
      <Button variant='outlined'>
        <ArrowBackIcon color='error' />
      </Button>
    </Link>
  );
}

export default GoToHome;
