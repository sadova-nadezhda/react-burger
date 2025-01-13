import { createSlice } from '@reduxjs/toolkit';

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    constructorItems: [],
    currentIngredient: null
  },
  reducers: {
    addIngredientToConstructor(state, action) {
      state.constructorItems.push(action.payload);
    },
    removeIngredientFromConstructor(state, action) {
      state.constructorItems = state.constructorItems.filter(
        ingredient => ingredient.id !== action.payload
      );
    },
    setCurrentIngredient(state, action) {
      state.currentIngredient = action.payload;
    }
  }
});

export const {
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  setCurrentIngredient
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
