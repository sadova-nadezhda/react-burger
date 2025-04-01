import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../types/IngredientTypes';

interface IngredientsState {
  allIngredients: Ingredient[];
  currentIngredient: Ingredient | null;
}

export const initialState: IngredientsState = {
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
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    },
    incrementIngredientCount: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const ingredient = state.allIngredients.find((ing) => ing._id === action.payload.id);
      if (ingredient) {
        ingredient.count = (ingredient.count ?? 0) + action.payload.amount;
      }
    },
    decrementIngredientCount: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const ingredient = state.allIngredients.find((ing) => ing._id === action.payload.id);
      if (ingredient) {
        ingredient.count = Math.max((ingredient.count ?? 0) - action.payload.amount, 0);
      }
    },
    resetAllIngredientCounts: (state) => {
      state.allIngredients.forEach((ingredient) => {
        ingredient.count = 0;
      });
    },
  },
});

export const {
  setAllIngredients,
  setCurrentIngredient,
  clearCurrentIngredient,
  incrementIngredientCount,
  decrementIngredientCount,
  resetAllIngredientCounts,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;