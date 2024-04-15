import {
  Box,
  Typography,
  Button,
  Link,
  ListItem,
  TextField,
} from '@mui/material';
import { Auth, getAuth } from 'firebase/auth';

interface ILoginFormContent {
  handleFormUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, auth: Auth) => void;
  handleOpen: () => void;
  errors: string[] | null;
  isSubmitEnabled: boolean;
}

function LoginFormContent({
  handleFormSubmit,
  handleFormUpdate,
  errors,
  handleOpen,
  isSubmitEnabled,
}: ILoginFormContent) {
  const auth = getAuth();

  const displayErrorMessages = (errors: string[]) => {
    return errors.map((errorMsg, key) => (
      <ListItem key={key} sx={{ padding: 0, fontSize: '0.8rem', color: 'red' }}>
        {errorMsg}
      </ListItem>
    ));
  };

  return (
    <Box
      onSubmit={(e) => handleFormSubmit(e, auth)}
      component='form'
      id='login-form'
      sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}
    >
      <TextField
        label='Email Address'
        type='text'
        name='email'
        aria-label='account email'
        onChange={handleFormUpdate}
        placeholder='Email Address'
        id='email'
        variant='standard'
      />
      <TextField
        label='Password'
        name='password'
        onChange={handleFormUpdate}
        placeholder='Password'
        id='password'
        type='password'
        variant='standard'
        required
      />
      {errors && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {displayErrorMessages(errors)}
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          id='forgot-password-button'
          onClick={handleOpen}
          size='small'
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.8rem' },
          }}
        >
          Forgot Password?
        </Button>
      </Box>

      <Button
        disabled={!isSubmitEnabled}
        id='login-form-submit'
        variant='contained'
        type='submit'
      >
        Login
      </Button>
      <Typography paragraph fontSize='small' sx={{ fontSize: { md: '1rem' } }}>
        Don't have an account? <Link href={`/register`}>Create one now.</Link>
      </Typography>
    </Box>
  );
}

export default LoginFormContent;
