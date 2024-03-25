import { Container, Paper } from '@mui/material';
import { ReactNode } from 'react';
import { useScreenSize } from '../../hooks/useScreenSize';

interface IJournalProps {
  children?: ReactNode;
}

function Journal({ children }: IJournalProps) {
  const screenSize = useScreenSize();
  return (
    <Container
      disableGutters={screenSize === 'xs'}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <Paper elevation={6} sx={bgPaperClasses}>
        {children}
      </Paper>
    </Container>
  );
}

const bgPaperClasses = {
  height: '100%',
  m: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  p: '1rem',
  flexGrow: 1,
};

export default Journal;
