import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SpaIcon from '@mui/icons-material/Spa';
import { UserContext } from '../../contexts';
import LoggedOutButtons from './LoggedOutButtons';
import LoggedInButtons from './LoggedInButtons';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@mui/material';
import { User } from '../../contexts';

export default function Header() {
  const { user } = React.useContext(UserContext);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <LargeScreenMenuAndHome />
          <MobileMenu
            openDrawer={openDrawer}
            handleCloseDrawer={handleCloseDrawer}
            handleOpenDrawer={handleOpenDrawer}
          />
          <SmallScreenHomeBtn />

          <SpaIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <LargeScreenLinks />
          <AuthButtons user={user} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function LargeScreenMenuAndHome() {
  const navigate = useNavigate();
  return (
    <>
      <SpaIcon // big screen far left icon
        sx={{
          display: { xs: 'none', md: 'flex' },
          mr: 1,
        }}
      />
      <Button // big screen bitelog home button
        sx={{
          display: { xs: 'none', md: 'block' },
          '&:hover': {
            background: 'none',
          },
          fontSize: { md: '1.1rem', lg: '1.3rem', xl: '1.4rem' },
        }}
        onClick={() => navigate('/')}
      >
        BiteLog
      </Button>
    </>
  );
}

function SmallScreenMenuBtn({
  handleOpenDrawer: handleOpenDrawer,
}: {
  handleOpenDrawer: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <IconButton
      size='large'
      aria-label='menu icon'
      aria-controls='menu-appbar'
      aria-haspopup='true'
      onClick={handleOpenDrawer}
      color='inherit'
    >
      <MenuIcon />
    </IconButton>
  );
}

function SmallScreenHomeBtn() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <Button
        aria-label='bitelog home page title button'
        sx={{
          fontSize: { sm: '1.1rem' },
          display: {
            xs: 'flex',
            md: 'none',
            '&:hover': {
              background: 'none',
            },
          },
        }}
        onClick={() => navigate('/')}
        variant='text'
      >
        BiteLog
      </Button>
    </Box>
  );
}

function LargeScreenLinks() {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        marginLeft: 4,
      }}
    >
      Button links here
    </Box>
  );
}

function AuthButtons({ user }: { user: User | null }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        gap: 2,
        alignItems: 'center',
        justifyContent: 'end',
      }}
    >
      {user === null ? <LoggedOutButtons /> : <LoggedInButtons />}
    </Box>
  );
}

function MobileMenu({
  handleOpenDrawer,
  handleCloseDrawer,
  openDrawer,
}: {
  handleOpenDrawer: () => void;
  handleCloseDrawer: () => void;
  openDrawer: boolean;
}) {
  return (
    <Box sx={mobileMenuContainer}>
      <SmallScreenMenuBtn handleOpenDrawer={handleOpenDrawer} />
      <Drawer onClose={handleCloseDrawer} open={openDrawer} anchor='left'>
        {/* TODO: Design / implement content of mobile menu */}
        <Box sx={{ py: '2rem', px: '1rem' }}>BiteLog</Box>
      </Drawer>
    </Box>
  );
}

const mobileMenuContainer = {
  display: { xs: 'flex', md: 'none' },
};
