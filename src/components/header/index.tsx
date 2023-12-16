import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SpaIcon from '@mui/icons-material/Spa';
import { UserContext } from '../../contexts';
import LoggedOutButtons from './LoggedOutButtons';
import LoggedInButtons from './LoggedInButtons';
import { useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const mapMenuItems = (pages: string[]) => {
    return pages.map((page, key) => (
      <MenuItem key={key}>
        <Button
          key={page}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          {page}
        </Button>
      </MenuItem>
    ));
  };

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SpaIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Button
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

          <Box sx={mobileMenuContainer}>
            <IconButton
              size='large'
              aria-label='menu icon'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {mapMenuItems(pages)}
            </Menu>
          </Box>
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
          <SpaIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', md: 'flex' },
              marginLeft: 4,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const mobileMenuContainer = {
  display: { xs: 'flex', md: 'none' },
};
