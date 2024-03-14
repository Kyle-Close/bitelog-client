import { Box, Button, TextField, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { UserContext } from '../../contexts';
import { mutateDataOnBackend } from '../../helpers/utility';
import { BASE_URL } from '../../config/axiosConfig';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

type MutationArgs = {
  url: string;
  data: Record<string, any>;
};

interface DisplayMessage {
  show: boolean;
  message?: React.ReactNode;
}

function AddIngredientModalContent() {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [displayMessage, setDisplayMessage] = useState<DisplayMessage | null>();
  const [ingredient, setIngredient] = useState<string>('');
  const addIngredientMutation = useMutation({
    mutationKey: ['ingredients', user?.uid],
    mutationFn: ({ url, data }: MutationArgs) => mutateDataOnBackend(url, data),
    onSuccess: () => {
      const msg = (
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'end' }}>
          <CheckCircleIcon color='success' />
          <Typography fontSize='0.8rem'>
            Successfully added ingredient!
          </Typography>
        </Box>
      );
      setDisplayMessage({
        show: true,
        message: msg,
      });
      queryClient.invalidateQueries({ queryKey: ['ingredients', user?.uid] });
    },
    onError: (error) => {
      console.log(error);
      const msg = (
        <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'end' }}>
          <ErrorIcon color='error' />
          <Typography fontSize='0.8rem'>{error.message}</Typography>
        </Box>
      );
      setDisplayMessage({
        show: true,
        message: msg,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ingredient === '') return;
    addIngredientMutation.mutate({
      url: BASE_URL + `/user/${user?.uid}/ingredients`,
      data: { name: ingredient },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredient = e.target.value;
    setIngredient(ingredient);
    setDisplayMessage({ show: false });
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <TextField
        onChange={handleChange}
        size='small'
        label='Ingredient'
        placeholder='Olive Oil'
        variant='filled'
        sx={{ display: 'flex' }}
      ></TextField>
      {displayMessage && displayMessage.show && displayMessage.message}
      <Button variant='contained' type='submit'>
        Add Ingredient
      </Button>
    </Box>
  );
}

export default AddIngredientModalContent;
