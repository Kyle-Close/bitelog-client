import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Divider,
  Button,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SpaIcon from '@mui/icons-material/Spa';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';

export function MobileMenu({
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
        <MenuContent handleCloseDrawer={handleCloseDrawer} />
      </Drawer>
    </Box>
  );
}

function MenuContent({ handleCloseDrawer }: { handleCloseDrawer: () => void }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        color={theme.palette.darker}
        sx={{ display: 'flex', alignItems: 'center', p: '1.5rem', gap: '1rem' }}
      >
        <SpaIcon />
        <Typography variant='h6'>Bitelog</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          py: '1rem',
          px: '1rem',
        }}
      >
        {createMenuItems(handleCloseDrawer)}
      </Box>
    </Box>
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

const mobileMenuContainer = {
  display: { xs: 'flex', md: 'none' },
};

const createMenuItems = (handleCloseDrawer: () => void) => {
  const menuList = menuObjectList;

  return menuList.map((item) => {
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          {item.icon}
          <Link onClick={handleCloseDrawer} to={item.to}>
            {item.name}
          </Link>
        </Box>
        <Divider sx={{ pt: '0.5rem' }} />
      </>
    );
  });
};

export const menuObjectList = [
  {
    name: 'My Journal',
    to: `/user/${1}/journal`,
    icon: <AutoStoriesIcon />,
  },
];
