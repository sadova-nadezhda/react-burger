import { setAllIngredients } from './slice';

const url = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredients = () => async (dispatch: any) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch(setAllIngredients(data.data));
  } catch (error) {
    console.error('Failed to fetch ingredients:', error);
  }
};