import { Modal, Box, Typography, Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Cancel';
interface IValidationEmailModal {
  isOpen: boolean;
  handleClose: () => void;
}

function ValidationEmailModal({ isOpen, handleClose }: IValidationEmailModal) {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 'sm',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            position: 'relative',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Account Successfully Created!
          </Typography>
          <Button onClick={handleClose}>
            <CancelIcon sx={{ position: 'absolute', right: 0 }} />
          </Button>
        </Box>

        <DoneIcon />
        <Typography align='center' id='modal-modal-description'>
          Please check your email inbox for a verification link to activate your
          account. If you don't see our email, be sure to check your spam or
          junk folder.
        </Typography>
      </Box>
    </Modal>
  );
}

export default ValidationEmailModal;
