// services/ingredients/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allIngredients: [],
  currentIngredient: null,  
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setAllIngredients: (state, action) => {
      state.allIngredients = action.payload;
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload;
    },
  },
});

export const { setAllIngredients, setCurrentIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
