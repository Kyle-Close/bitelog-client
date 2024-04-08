import { Box, Button, IconButton, Typography } from '@mui/material';

interface FeatureHighlightProps {
  text: string;
  src: string;
  order: number;
}

export function FeatureHighlight({ text, src, order }: FeatureHighlightProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
        }}
      >
        <IconButton
          sx={{
            bgcolor: 'lightblue',
            width: '30px',
            height: '30px',
            color: 'black',
            p: '1rem',
          }}
        >
          {order}
        </IconButton>
        <Typography fontWeight='semi-bold'>{text}</Typography>
      </Box>
      <Box
        sx={{
          maxWidth: { xs: '300px', sm: '500px' },
          height: 'auto',
        }}
        component='img'
        src={src}
      ></Box>
    </Box>
  );
}
