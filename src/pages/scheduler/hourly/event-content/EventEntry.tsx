import { Box, Button, Typography } from '@mui/material';
import { EatLogDataValue } from '../HourContainerList';
import { EventLogDataValue } from '../../helpers';
import BasicModal from '../../../../components/generic/BasicModal';
import { useState } from 'react';
import Event from './modal-contents/Event';
import Eat from './modal-contents/Eat';

interface EventEntry {
  type: 'eat' | 'event';
  title: string;
  data: EatLogDataValue | EventLogDataValue;
}

function EventEntry({ type, title, data }: EventEntry) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const eventBackgroundColor = type === 'eat' ? '#0B60B0' : '#ff7700';

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
        backgroundColor: eventBackgroundColor,
        borderRadius: '0.5rem',
        px: '1rem',
        flexGrow: 1,
      }}
    >
      <BasicModal isOpen={isModalOpen} onClose={onModalClose} title={`${title} Log`}>
        {type === 'event' && <Event data={data as EventLogDataValue} />}
        {type === 'eat' && <Eat data={data as EatLogDataValue} />}
      </BasicModal>
      <Button onClick={handleButtonClick} sx={{ display: 'flex', flexGrow: 1 }}>
        <Typography fontWeight='bold' textAlign='center' sx={{ flexGrow: 1 }} alignSelf='center'>
          {title}
        </Typography>
      </Button>
    </Box>
  );
}

export default EventEntry;
