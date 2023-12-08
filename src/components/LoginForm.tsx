import { Box, Typography, Button, Divider, Input, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function LoginForm() {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '4rem',
      }}
    >
      <Typography variant='h6'>Login to your account</Typography>
      <Button variant='outlined' startIcon={<GoogleIcon />}>
        Login with Google
      </Button>
      <Divider>OR</Divider>
      <Box
        component='form'
        sx={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}
      >
        <Input placeholder='Email Address' id='email' />
        <Input placeholder='Password' id='password' type='password' required />
        <Link href='#' underline='none' fontSize='small' alignSelf='end'>
          Forgot Password?
        </Link>
        <Button variant='contained'>Login</Button>
        <Typography paragraph fontSize='small'>
          Don't have an account? <Link href='#'>Create one now.</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default LoginForm;
