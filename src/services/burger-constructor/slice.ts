import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  resetConstructor,
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
