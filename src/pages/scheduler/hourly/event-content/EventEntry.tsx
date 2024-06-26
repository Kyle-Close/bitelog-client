import { Box, Button, Typography } from '@mui/material';
import { EatLogDataValue } from '../HourContainerList';
import { EventLogDataValue } from '../../helpers';
import BasicModal from '../../../../components/generic/BasicModal';
import { useState } from 'react';
import Event from './modal-contents/Event';
import Eat from './modal-contents/Eat';
import { BaseModal } from '../../../../components/generic/BaseModal';

interface EventEntry {
  type: 'eat' | 'event';
  title: string;
  data: EatLogDataValue | EventLogDataValue;
}

function EventEntry({ type, title, data }: EventEntry) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const eventBackgroundColor = type === 'eat' ? '#8FBC8F' : '#ff7700';

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '0.5rem',
        flexGrow: 1,
      }}
    >
      <BaseModal isOpen={isModalOpen} handleClose={onModalClose}>
        {type === 'event' && <Event data={data as EventLogDataValue} />}
        {type === 'eat' && <Eat data={data as EatLogDataValue} />}
      </BaseModal>
      <Button
        onClick={handleButtonClick}
        sx={{
          display: 'flex',
          flexGrow: 1,
          bgcolor: eventBackgroundColor,
          color: 'black',
          maxHeight: {
            xs: '1.5rem',
            sm: '1.55rem',
            md: '1.6rem',
            lg: '1.75rem',
          },
          borderRadius: '2px',
        }}
      >
        <Typography
          fontWeight='bold'
          textAlign='center'
          sx={{
            flexGrow: 1,
            fontSize: { xs: '0.8rem', md: '0.9rem', lg: '1rem' },
          }}
          alignSelf='center'
        >
          {title}
        </Typography>
      </Button>
    </Box>
  );
}

export default EventEntry;
