import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredientsData } from './actions';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  fetchIngredientsData 
);

const initialState = {
  ingredients: [],
  selectedIngredient: null,
  ingredientsLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    selectIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },
    deselectIngredient: (state) => {
      state.selectedIngredient = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.ingredientsLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { selectIngredient, deselectIngredient } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
