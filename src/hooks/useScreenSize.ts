import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material';

export function useScreenSize() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  const getCurrentSize = () => {
    if (!isSm) return 'xs';
    else if (isXl) return 'xl';
    else if (isLg) return 'lg';
    else if (isMd) return 'md';
    else return 'sm';
  };

  return getCurrentSize();
}
