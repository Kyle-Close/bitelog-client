import { Paper } from '@mui/material';
import { ReactNode } from 'react';

interface IJournalProps {
  children?: ReactNode;
}

function Journal({ children }: IJournalProps) {
  return (
    <Paper elevation={6} sx={bgPaperClasses}>
      {children}
    </Paper>
  );
}

const bgPaperClasses = {
  height: '100%',
  m: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  p: '1rem',
};

export default Journal;
