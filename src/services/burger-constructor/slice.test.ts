import reducer, {
  addIngredientToConstructor,
  reorderIngredients,
  removeIngredientFromConstructor,
  resetConstructor,
  initialState,
} from './slice';
import { v4 as uuidv4 } from 'uuid';

const bun = { _id: '1', name: 'Bun', type: 'bun', price: 10 };
const ingredient1 = { _id: '2', name: 'Lettuce', type: 'main', price: 5 };
const ingredient2 = { _id: '3', name: 'Cheese', type: 'main', price: 7 };

describe('burgerConstructorSlice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle addIngredientToConstructor (bun)', () => {
    const stateWithBun = reducer(initialState, addIngredientToConstructor(bun));
    expect(stateWithBun.constructorIngredients).toHaveLength(1);
    expect(stateWithBun.constructorIngredients[0]).toMatchObject(bun);

    const newBun = { ...bun, uuid: uuidv4() };
    const updatedState = reducer(stateWithBun, addIngredientToConstructor(newBun));
    expect(updatedState.constructorIngredients).toHaveLength(1);
    expect(updatedState.constructorIngredients[0].uuid).not.toBe(stateWithBun.constructorIngredients[0].uuid);
  });

  it('should handle addIngredientToConstructor (other ingredients)', () => {
    const stateWithIngredient = reducer(initialState, addIngredientToConstructor(ingredient1));
    expect(stateWithIngredient.constructorIngredients).toHaveLength(1);
    expect(stateWithIngredient.constructorIngredients[0]).toMatchObject(ingredient1);

    const newState = reducer(stateWithIngredient, addIngredientToConstructor(ingredient2));
    expect(newState.constructorIngredients).toHaveLength(2);
    expect(newState.constructorIngredients.map(({ _id }) => _id)).toEqual([ingredient1._id, ingredient2._id]);
  });

  it('should handle reorderIngredients', () => {
    const state = { ...initialState, constructorIngredients: [ingredient1, ingredient2] };
    const reorderedState = reducer(state, reorderIngredients([ingredient2, ingredient1]));
    expect(reorderedState.constructorIngredients).toEqual([ingredient2, ingredient1]);
  });

  it('should handle removeIngredientFromConstructor', () => {
    const ingredientWithUUID = { ...ingredient1, uuid: uuidv4() };
    const state = { ...initialState, constructorIngredients: [ingredientWithUUID, ingredient2] };
    const newState = reducer(state, removeIngredientFromConstructor(ingredientWithUUID.uuid));
    expect(newState.constructorIngredients).toHaveLength(1);
    expect(newState.constructorIngredients[0]).toMatchObject(ingredient2);
  });

  it('should handle resetConstructor', () => {
    const state = { ...initialState, constructorIngredients: [bun, ingredient1, ingredient2] };
    const resetState = reducer(state, resetConstructor());
    expect(resetState.constructorIngredients).toHaveLength(0);
  });
});