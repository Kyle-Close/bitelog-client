import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { UserContext } from '../context';
import { makeRequestToBackend } from '../helpers/utility';
import { BASE_URL } from '../config/axiosConfig';

export function useIngredientForm() {
  const { user } = useContext(UserContext);
  const [ingredientName, setIngredientName] = useState('');
  const queryClient = useQueryClient();

  const createIngredientMutation = useMutation({
    mutationKey: ['ingredients', user?.uid],
    mutationFn: () => submitForm(),
    onSuccess: () => {
      setIngredientName('');
      if (user && user.uid) {
        queryClient.invalidateQueries({ queryKey: ['ingredients', user.uid] });
      }
    },
  });

  const handleIngredientNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientName(e.target.value);
    createIngredientMutation.reset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createIngredientMutation.mutate();
  };

  const submitForm = async () => {
    try {
      const result = await makeRequestToBackend({
        url: `${BASE_URL}/user/${user?.uid}/ingredients`,
        method: 'POST',
        body: { name: ingredientName },
      });
      console.log(result);
    } catch (err) {
      throw err;
    }
  };

  return {
    ingredientName,
    handleIngredientNameChange,
    handleSubmit,
    createIngredientMutation,
  };
}
