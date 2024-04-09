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
        fontSize: { xs: '1.05rem' },
      }}
    >
      <Typography color='primary' variant='h5'>
        {heading}
      </Typography>
      {children}
    </Box>
  );
}
