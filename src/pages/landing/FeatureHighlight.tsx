import { Box, Typography } from '@mui/material';

interface FeatureHighlightProps {
  text: string;
  src: string;
}

export function FeatureHighlight({ text, src }: FeatureHighlightProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <Typography fontSize='small'>{text}</Typography>
      <Box component='img' src={src}></Box>
    </Box>
  );
}
