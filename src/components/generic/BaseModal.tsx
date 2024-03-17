import { Modal, Paper } from '@mui/material';

interface BaseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children?: React.ReactNode;
}

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: { xs: '90%', sm: '85%', md: '65%', lg: '50%' },
  border: '2px solid #000',
  boxShadow: 24,
  p: {
    xs: '0.5rem',
    sm: '0.8rem',
    md: '1rem',
    lg: '1.2rem',
  },
};

export function BaseModal({ isOpen, handleClose, children }: BaseModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // Adjust background opacity here
          },
        },
      }}
    >
      <Paper elevation={6} sx={style}>
        {children}
      </Paper>
    </Modal>
  );
}
