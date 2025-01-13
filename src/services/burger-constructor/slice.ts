import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../../utils/types';

interface ConstructorState {
  constructorIngredients: Ingredient[]; 
}

const initialState: ConstructorState = {
  constructorIngredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredientToConstructor: (state, action) => {
      state.constructorIngredients.push(action.payload);
    },
    removeIngredientFromConstructor: (state, action) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    resetConstructor: (state) => {
      state.constructorIngredients = [];
    },
  },
});

export const {
  setConstructorIngredients,
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  resetConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
