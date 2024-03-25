import { BASE_URL } from '../../config/axiosConfig';
import { makeRequestToBackend } from '../utility';

export async function fetchUserIngredients(uid: string) {
  const url = `${BASE_URL}/user/${uid}/ingredients`;
  try {
    const ingredientData: IngredientsResponse = await makeRequestToBackend({
      url,
    });
    return ingredientData.ingredients;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export interface Ingredient {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface IngredientsResponse {
  msg: string;
  ingredients: Ingredient[];
}
