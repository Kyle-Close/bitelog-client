import { Box, Typography } from '@mui/material';
import { useState } from 'react';

interface ReadMoreProps {
  charLimit: number;
  text: string;
}
export function ReadMore({ charLimit, text }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded ? text : text.slice(0, charLimit - 1);
  const isEllipsis = text.length >= charLimit;
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='overline'>{displayText}</Typography>
      {isEllipsis && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setIsExpanded(!isExpanded)} className='ellipsis'>
            ...
          </button>
        </Box>
      )}
    </Box>
  );
}
