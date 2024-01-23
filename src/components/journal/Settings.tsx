import { Box, TextField, Button } from '@mui/material';

function SettingsForm() {
  return (
    <Box
      component='form'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '2rem',
        flexGrow: 1,
        m: '1rem',
      }}
    >
      <TextField
        sx={{ display: 'flex' }}
        variant='standard'
        label='Journal Name'
      />
      <Button sx={{ mt: 'auto' }} variant='contained' type='submit'>
        Update Settings
      </Button>
    </Box>
  );
}

export default SettingsForm;
