import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton, Typography } from '@mui/material';
import { getDaySuffix, getFullMonthText } from '../../../helpers/utility';
import { useScreenSize } from '../../../hooks/useScreenSize';

interface StickyHourlyMenu {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function StickyHourlyMenu({ date, setDate }: StickyHourlyMenu) {
  const screenSize = useScreenSize();
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
        minHeight: { xs: '3rem', sm: '3.5rem', md: '4rem', lg: '5rem' },
        backgroundColor: '#606060',
        p: '0.5rem',
        position: 'sticky',
        zIndex: 50,
        top: 0,
        borderBottom: '0.15rem solid #121212',
      }}
    >
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Box sx={buttonContainerStyle}>
          <IconButton onClick={onLeftBtnClick}>
            <KeyboardArrowLeftIcon
              fontSize={screenSize === 'xs' ? 'medium' : 'large'}
            />
          </IconButton>
        </Box>
        <Box sx={buttonContainerStyle}>
          <IconButton onClick={onRightBtnClick}>
            <KeyboardArrowRightIcon
              fontSize={screenSize === 'xs' ? 'medium' : 'large'}
            />
          </IconButton>
        </Box>
        <Typography
          sx={{
            alignSelf: 'center',
            ml: '1rem',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem', lg: '1.3rem' },
          }}
          variant='h6'
        >
          {dateString}
        </Typography>
      </Box>
      <Box sx={buttonContainerStyle}>
        <IconButton color='success' sx={{ mr: '1rem' }}>
          <AddCircleIcon fontSize={screenSize === 'xs' ? 'medium' : 'large'} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default StickyHourlyMenu;

const buttonContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};
