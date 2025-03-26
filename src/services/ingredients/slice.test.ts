import reducer, {
  setAllIngredients,
  setCurrentIngredient,
  clearCurrentIngredient,
  incrementIngredientCount,
  decrementIngredientCount,
  resetAllIngredientCounts,
  initialState,
} from './slice';
import { fetchIngredients } from './actions';
import { request } from '../../utils/request';

jest.mock('../../utils/request', () => ({
  request: jest.fn(),
}));

const ingredient1 = { _id: '1', name: 'Bun', type: 'bun', price: 10, count: 0 };
const ingredient2 = { _id: '2', name: 'Cheese', type: 'main', price: 5, count: 0 };

describe('ingredientsSlice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setAllIngredients', () => {
    const state = reducer(initialState, setAllIngredients([ingredient1, ingredient2]));
    expect(state.allIngredients).toEqual([ingredient1, ingredient2]);
  });

  it('should handle setCurrentIngredient', () => {
    const state = reducer(initialState, setCurrentIngredient(ingredient1));
    expect(state.currentIngredient).toEqual(ingredient1);
  });

  it('should handle clearCurrentIngredient', () => {
    const state = { allIngredients: [], currentIngredient: ingredient1 };
    const newState = reducer(state, clearCurrentIngredient());
    expect(newState.currentIngredient).toBeNull();
  });

  it('should handle incrementIngredientCount', () => {
    const state = { allIngredients: [ingredient1, ingredient2], currentIngredient: null };
    const newState = reducer(state, incrementIngredientCount({ id: '1', amount: 2 }));
    expect(newState.allIngredients[0].count).toBe(2);
  });

  it('should handle decrementIngredientCount', () => {
    const state = { allIngredients: [{ ...ingredient1, count: 3 }, ingredient2], currentIngredient: null };
    const newState = reducer(state, decrementIngredientCount({ id: '1', amount: 2 }));
    expect(newState.allIngredients[0].count).toBe(1);
  });

  it('should not decrement below zero', () => {
    const state = { allIngredients: [{ ...ingredient1, count: 1 }, ingredient2], currentIngredient: null };
    const newState = reducer(state, decrementIngredientCount({ id: '1', amount: 2 }));
    expect(newState.allIngredients[0].count).toBe(0);
  });

  it('should handle resetAllIngredientCounts', () => {
    const state = { allIngredients: [{ ...ingredient1, count: 3 }, { ...ingredient2, count: 2 }], currentIngredient: null };
    const newState = reducer(state, resetAllIngredientCounts());
    expect(newState.allIngredients[0].count).toBe(0);
    expect(newState.allIngredients[1].count).toBe(0);
  });
});

describe('fetchIngredients action', () => {
  it('should dispatch setAllIngredients on success', async () => {
    const mockDispatch = jest.fn();
    const mockData = { data: [ingredient1, ingredient2] };
    request.mockResolvedValue(mockData);

    await fetchIngredients()(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setAllIngredients(mockData.data));
  });

  it('should handle fetchIngredients failure', async () => {
    console.error = jest.fn();
    request.mockRejectedValue(new Error('Network Error'));

    await fetchIngredients()(jest.fn());
    expect(console.error).toHaveBeenCalledWith('Не удалось получить ингредиенты:', expect.any(Error));
  });
});
