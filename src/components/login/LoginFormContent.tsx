import { Box, Typography, Button, Input, Link, ListItem } from '@mui/material';
import { Auth, getAuth } from 'firebase/auth';

interface ILoginFormContent {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, auth: Auth) => void;
  handleFormUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
    >
      <Input
        type='text'
        name='email'
        aria-label='account email'
        onChange={handleFormUpdate}
        placeholder='Email Address'
        id='email'
      />
      <Input
        name='password'
        onChange={handleFormUpdate}
        placeholder='Password'
        id='password'
        type='password'
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
          sx={{ fontSize: '0.7rem' }}
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
      <Typography paragraph fontSize='small'>
        Don't have an account? <Link href='/register'>Create one now.</Link>
      </Typography>
    </Box>
  );
}

export default LoginFormContent;
