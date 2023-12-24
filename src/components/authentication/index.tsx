import { Box, Container } from '@mui/material';
import authImg from '../../assets/auth.png';
import LoginForm from './login';
import Register from './register';

interface IAuthentication {
  isLogin: boolean;
}

function Authentication({ isLogin }: IAuthentication) {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1',
        maxHeight: '100%',
      }}
    >
      <Box
        component='img'
        alt='Side profile of woman made up of various fruits and vegetables'
        src={authImg}
        sx={{
          display: { xs: 'none', sm: 'block' },
          objectFit: 'contain',
          maxWidth: { sm: '50%', md: '40%' },
          backgroundColor: '#c7c7c7',
          height: '100%',
        }}
      ></Box>
      <Container maxWidth='md' sx={{ display: 'flex' }}>
        {isLogin ? <LoginForm /> : <Register />}
      </Container>
    </Box>
  );
}

export default Authentication;
