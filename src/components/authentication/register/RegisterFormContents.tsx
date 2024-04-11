import {
  Box,
  Typography,
  Button,
  Link,
  ListItem,
  TextField,
} from '@mui/material';
import { Auth, getAuth } from 'firebase/auth';
import { BASE_CLIENT_URL } from '../../../config/axiosConfig';

interface IRegisterFormContent {
  handleFormUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, auth: Auth) => void;
  errors: string[] | null;
  isSubmitEnabled: boolean;
}

function RegisterFormContent({
  handleFormSubmit,
  handleFormUpdate,
  errors,
  isSubmitEnabled,
}: IRegisterFormContent) {
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
      id='register-form'
      sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}
    >
      <TextField
        label='Username'
        type='text'
        name='username'
        aria-label='account username'
        onChange={handleFormUpdate}
        placeholder='Username'
        id='username'
        variant='standard'
      />
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
      <TextField
        label='Confirm Password'
        name='confirmPassword'
        onChange={handleFormUpdate}
        placeholder='Confirm Password'
        id='confirmPassword'
        type='password'
        variant='standard'
        required
      />
      {errors && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          {displayErrorMessages(errors)}
        </Box>
      )}
      <Button
        sx={{ mt: '1rem' }}
        disabled={!isSubmitEnabled}
        id='login-form-submit'
        variant='contained'
        type='submit'
      >
        Register
      </Button>
      <Typography paragraph fontSize='small'>
        Already have an account?{' '}
        <Link href={`/${BASE_CLIENT_URL}/login`}>Login now.</Link>
      </Typography>
    </Box>
  );
}

export default RegisterFormContent;
