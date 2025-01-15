import { createSlice } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/IngredientTypes';

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
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorIngredients = [
          ...state.constructorIngredients.filter((item) => item.type !== 'bun'),
          ingredient,
        ];
      } else {
        state.constructorIngredients.push(ingredient);
      }
    },
    removeIngredientFromConstructor: (state, action) => {
      state.constructorIngredients = state.constructorIngredients.filter(
        (ingredient) => ingredient._id !== action.payload
      );
    },
    resetConstructor: (state) => {
      state.constructorIngredients = [];
    },
  },
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  resetConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
