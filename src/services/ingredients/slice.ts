import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../utils/types';

interface IngredientsState {
  allIngredients: Ingredient[]; 
  currentIngredient: Ingredient | null; 
}

const initialState: IngredientsState = {
  allIngredients: [],
  currentIngredient: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setAllIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.allIngredients = action.payload;
    },
    setCurrentIngredient: (state, action: PayloadAction<Ingredient | null>) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient(state) {
      state.currentIngredient = null;
    },
  },
});

export const { setAllIngredients, setCurrentIngredient, clearCurrentIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
