import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Divider,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SpaIcon from '@mui/icons-material/Spa';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context';

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
  const createMenuItems = (handleCloseDrawer: () => void) => {
    const { user } = useContext(UserContext);

    return menuObjectList.map((item, key) => {
      const url = `/user/${user?.uid}/journal/${user?.journalId}`;
      return (
        <Box key={key}>
          <Box
            key={key}
            sx={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}
          >
            {item.icon}
            <Link onClick={handleCloseDrawer} to={url}>
              {item.name}
            </Link>
          </Box>
        </Box>
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.darkerPaper',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: '1.5rem',
          gap: '1rem',
        }}
      >
        <SpaIcon />
        <Typography color='primary' variant='h5' fontWeight='600'>
          B
          <Typography
            fontWeight='600'
            sx={{ fontSize: '1.2rem' }}
            variant='h5'
            component='span'
          >
            ITELOG
          </Typography>
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', p: '1rem' }}>
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

export const menuObjectList = [
  {
    name: 'My Journal',
    to: `journal`,
    icon: <AutoStoriesIcon />,
  },
];
