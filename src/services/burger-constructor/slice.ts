import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
  },
});

export const { addIngredient, removeIngredient } = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
