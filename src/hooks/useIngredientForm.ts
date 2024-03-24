import { useMutation } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { UserContext } from '../context';

export function useIngredientForm() {
  const { user } = useContext(UserContext);
  const [ingredientName, setIngredientName] = useState('');
  const createIngredientMutation = useMutation({
    mutationKey: ['ingredients', user?.uid],
  });

  const handleIngredientNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIngredientName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return { ingredientName, handleIngredientNameChange };
}
