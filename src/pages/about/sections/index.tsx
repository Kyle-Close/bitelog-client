import { Box, Typography } from '@mui/material';

interface AboutSectionProps {
  heading: string;
  children: React.ReactNode;
}

export function AboutSection({ heading, children }: AboutSectionProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        fontSize: { xs: '1.05rem', sm: '1.1rem', md: '1.2rem' },
      }}
    >
      <Typography
        color='primary'
        variant='h5'
        fontSize={{ xs: '1.4rem', sm: '1.55rem', md: '1.65rem' }}
      >
        {heading}
      </Typography>
      {children}
    </Box>
  );
}
