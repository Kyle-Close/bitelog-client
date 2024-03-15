import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SpaIcon from '@mui/icons-material/Spa';
import { UserContext } from '../../context';
import LoggedOutButtons from './LoggedOutButtons';
import LoggedInButtons from './LoggedInButtons';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../context';
import { MobileMenu, menuObjectList } from './MobileMenu';

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
    <AppBar position='sticky'>
      <Container>
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
  const { user } = React.useContext(UserContext);
  const createLargeScreenLinks = () => {
    return menuObjectList.map((item, key) => {
      const url = `/user/${user?.uid}/journal/${user?.journalId}`;
      return (
        <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          {item.icon}
          <Link to={url}>{item.name}</Link>
        </Box>
      );
    });
  };
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        marginLeft: 8,
      }}
    >
      {createLargeScreenLinks()}
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
