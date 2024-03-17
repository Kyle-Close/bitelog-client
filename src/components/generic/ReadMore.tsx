import { Box, Button, Link, Typography } from '@mui/material';
import { useState } from 'react';

interface ReadMoreProps {
  charLimit: number;
  text: string;
}
export function ReadMore({ charLimit, text }: ReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  let displayText = isExpanded ? text : text.slice(0, charLimit - 1);
  const isEllipsis = text.length >= charLimit;

  if (isEllipsis && !isExpanded) displayText += '...';
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='overline'>{displayText}</Typography>
      {isEllipsis && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link variant='caption' onClick={() => setIsExpanded(!isExpanded)} className='ellipsis'>
            {isExpanded ? 'see less' : 'see more'}
          </Link>
        </Box>
      )}
    </Box>
  );
}
