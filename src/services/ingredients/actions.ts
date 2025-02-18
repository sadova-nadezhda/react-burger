import { AppDispatch } from '../store';
import { setAllIngredients } from './slice';
import { request } from '../../utils/request';
import { Ingredient } from '../../types/IngredientTypes';

interface IngredientsResponse {
  data: Ingredient[];
}

export const fetchIngredients = () => async (dispatch: AppDispatch) => {
  try {
    const data: IngredientsResponse = await request('/ingredients');
    dispatch(setAllIngredients(data.data));
  } catch (error) {
    console.error('Не удалось получить ингредиенты:', error);
  }
};