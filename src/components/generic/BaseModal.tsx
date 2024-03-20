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
  transform: 'translate(-50%, -30%)',
  bgcolor: 'background.paper',
  width: { xs: '90%', sm: '85%', md: '65%', lg: '50%' },
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '8px',
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
