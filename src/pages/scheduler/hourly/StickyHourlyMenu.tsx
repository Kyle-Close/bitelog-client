import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, IconButton } from '@mui/material';
import { SchedulerModal } from '../modals/SchedulerModal';
import { useState } from 'react';
import { MuiDatePicker } from '../../../components/generic/MuiDatePicker';

interface StickyHourlyMenu {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

function StickyHourlyMenu({ date, setDate }: StickyHourlyMenu) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignContent: 'center',
        minHeight: { xs: '3rem', sm: '3.5rem', md: '4rem', lg: '5rem' },
        backgroundColor: '#606060',
        p: '0.8rem',
        position: 'sticky',
        zIndex: 50,
        top: { xs: 55, sm: 60 },
        borderBottom: '0.15rem solid #121212',
      }}
    >
      <SchedulerModal
        createSelectedDate={date}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        isUpdating={false}
      />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <MuiDatePicker date={date} handleChange={(date) => setDate(date)} />
      </Box>
      <Box sx={buttonContainerStyle}>
        <IconButton
          onClick={() => setIsOpen(true)}
          color='success'
          sx={{ mr: '1rem' }}
        >
          <AddCircleIcon fontSize='large' />
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
