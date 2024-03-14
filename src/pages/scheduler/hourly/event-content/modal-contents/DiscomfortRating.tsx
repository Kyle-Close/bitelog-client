import SickIcon from '@mui/icons-material/Sick';
import { Box } from '@mui/material';

interface DiscomfortRating {
  rating: string;
}

function DiscomfortRating({ rating }: DiscomfortRating) {
  const result: React.ReactNode[] = [];
  const ratingNum = Number(rating);
  for (let i = 0; i < 5; i++) {
    if (ratingNum > i) result.push(<SickIcon key={i} color='error' />);
    else result.push(<SickIcon key={i} sx={{ opacity: '0.5' }} />);
  }
  return <Box component='span'>{result}</Box>;
}

export default DiscomfortRating;
