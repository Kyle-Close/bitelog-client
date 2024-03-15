import { Box, Container, Modal, useTheme } from '@mui/material';
import TabSwitcher from '../../components/generic/TabSwitcher';
import { FoodForm } from './FoodForm';

interface FoodIngredientModalProps {
  isOpen: boolean;
  handleClose: (value: React.SetStateAction<boolean>) => void;
}

export function FoodIngredientModal({ isOpen, handleClose }: FoodIngredientModalProps) {
  const bgColor = '#303740';
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        pt: {
          xs: '10rem',
          sm: '12rem',
          md: '15rem',
        },
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: { bgColor }, justifyContent: 'center' }}>
          <TabSwitcher
            tabs={[
              { tabName: 'Create Food', tabPanel: <FoodForm /> },
              { tabName: 'Create Ingredient', tabPanel: <Box>TO DO...</Box> },
            ]}
          />
        </Box>
      </Container>
    </Modal>
  );
}
