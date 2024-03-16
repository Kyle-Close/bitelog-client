import { Box, Container, Modal, Paper, useTheme } from '@mui/material';
import TabSwitcher from '../../components/generic/TabSwitcher';
import { FoodForm } from './FoodForm';

interface FoodIngredientModalProps {
  isOpen: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  maxWidth: { sm: '75%', md: '65%', lg: '50%' },
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function FoodIngredientModal({ isOpen, handleClose }: FoodIngredientModalProps) {
  const bgColor = '#303740';
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)', // Adjust background opacity here
          },
        },
      }}
      sx={{
        pt: {
          xs: '10rem',
          sm: '12rem',
          md: '15rem',
        },
      }}
    >
      <Container sx={style}>
        <Paper
          elevation={6}
          sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.paper', justifyContent: 'center' }}
        >
          <TabSwitcher
            tabs={[
              { tabName: 'Create Food', tabPanel: <FoodForm /> },
              { tabName: 'Create Ingredient', tabPanel: <Box>TO DO...</Box> },
            ]}
          />
        </Paper>
      </Container>
    </Modal>
  );
}
