import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Typography } from '@mui/material';
import { getDaySuffix, getFullMonthText } from '../../../helpers/utility';

interface StickyHourlyMenu {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function StickyHourlyMenu({ date, setDate }: StickyHourlyMenu) {
  const month = getFullMonthText(date.getMonth());
  const day = date.getDate();
  const daySuffix = getDaySuffix(day);
  const year = date.getFullYear();
  const dateString = `${month} ${day + daySuffix} ${year}`;

  const onRightBtnClick = () => {
    let tempDate = new Date(date);
    tempDate.setDate(date.getDate() + 1);
    setDate(tempDate);
  };

  const onLeftBtnClick = () => {
    let tempDate = new Date(date);
    tempDate.setDate(date.getDate() - 1);
    setDate(tempDate);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        flexGrow: 1,
        minHeight: '5rem',
        backgroundColor: '#606060',
        p: '0.5rem',
        position: 'sticky',
        zIndex: 50,
        top: 0,
        borderBottom: '0.15rem solid #121212',
      }}
    >
      <IconButton onClick={onLeftBtnClick}>
        <KeyboardArrowLeftIcon fontSize='large' />
      </IconButton>
      <IconButton onClick={onRightBtnClick}>
        <KeyboardArrowRightIcon fontSize='large' />
      </IconButton>
      <Typography sx={{ alignSelf: 'center', ml: '1rem' }} variant='h6'>
        {dateString}
      </Typography>
      <IconButton color='success' sx={{ ml: 'auto', pr: '1rem' }}>
        <AddCircleIcon fontSize='large' />
      </IconButton>
    </Box>
  );
}

export default StickyHourlyMenu;
