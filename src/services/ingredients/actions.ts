import { setAllIngredients } from './slice';
import { request } from '../../utils/request';

export const fetchIngredients = () => async (dispatch: any) => {
  try {
    const data = await request('/ingredients');
    dispatch(setAllIngredients(data.data));
  } catch (error) {
    console.error('Не удалось получить ингредиенты:', error);
  }
};