import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
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
            sx={{ display: { xs: 'none', md: 'block' } }}
            onClick={() => navigate('/')}
          >
            <Typography variant='h6' noWrap component='a' sx={biteLogTitleSX}>
              BiteLog
            </Typography>
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
              sx={{ display: { xs: 'flex', md: 'none' } }}
              onClick={() => navigate('/')}
            >
              <Typography
                variant='h5'
                noWrap
                component='a'
                fontSize='large'
                sx={mobileBiteLogTitleSX}
              >
                BiteLog
              </Typography>
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

const biteLogTitleSX = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  color: 'inherit',
  textDecoration: 'none',
};

const mobileBiteLogTitleSX = {
  mr: 2,
  display: { xs: 'flex', md: 'none' },
  flexGrow: 1,
  fontFamily: 'monospace',
  fontWeight: 700,
  color: 'inherit',
  textDecoration: 'none',
};

const mobileMenuContainer = {
  display: { xs: 'flex', md: 'none' },
};
