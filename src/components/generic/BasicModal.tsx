import { Box, Button, Typography, Modal, Divider } from '@mui/material';
import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface BasicModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}

function BasicModal({ onClose, isOpen, title, children }: BasicModal) {
  return (
    <Modal onClose={onClose} open={isOpen}>
      <Box sx={style}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant='h6'>{title}</Typography>
          <Button
            sx={{
              position: 'absolute',
              right: 0,
              top: 5,
              mr: '0.5rem',
              mt: '0.5rem',
            }}
            onClick={onClose}
          >
            <CloseIcon sx={{ fontSize: '40px' }} color='error' />
          </Button>
        </Box>
        <Divider />
        {children}
      </Box>
    </Modal>
  );
}

export default BasicModal;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#4A525A',
  border: '2px solid #000',
  borderRadius: '8px',
  minWidth: '350px',
  boxShadow: 24,
  p: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
};
