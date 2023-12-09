import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Input, TextField } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CancelIcon from '@mui/icons-material/Cancel';
import { Auth, getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

interface ForgotPasswordModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ForgotPasswordModal({
  open,
  setOpen,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState<string>('');
  const handleClose = () => setOpen(false);
  const auth = getAuth();

  const sendResetPasswordEmail = async (auth: Auth) => {
    if (!email) return;
    try {
      await sendPasswordResetEmail(auth, email);
      handleClose();
    } catch (err: any) {
      const errorMessage = err.message;
      console.log(errorMessage);
    }
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='Forgot password modal'
        aria-describedby='Pop up modal with form to submit email associated with forgotten password account'
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
            }}
          >
            <Typography variant='subtitle1'>FORGOT PASSWORD</Typography>
            <Box sx={{ position: 'absolute', right: '0' }}>
              <Button
                onClick={handleClose}
                sx={{ padding: 0, borderRadius: '50%', minWidth: 0 }}
              >
                <CancelIcon />
              </Button>
            </Box>
          </Box>
          <Divider light></Divider>
          <Box
            sx={{
              alignSelf: 'center',
              mt: '1rem',
              p: '0.75rem',
              border: '1px solid lightGray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
            }}
          >
            <LockOpenIcon fontSize='large' />
          </Box>
          <Typography fontSize='small' align='center'>
            To reset your password, enter the email address associated with your
            account
          </Typography>
          <Box
            onSubmit={() => sendResetPasswordEmail(auth)}
            component='form'
            sx={{
              display: 'flex',
              pt: '1rem',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <TextField
              type='email'
              required
              sx={{ flex: 1 }}
              placeholder='Email Address'
              onChange={handleChange}
            />
            <Button type='submit' variant='contained'>
              Send Email
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}