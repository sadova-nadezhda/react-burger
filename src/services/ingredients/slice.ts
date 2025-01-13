import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchIngredientsData } from './actions'; // Импортируем функцию

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  fetchIngredientsData  // Передаем саму функцию как асинхронную логику
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    allIngredients: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allIngredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default ingredientsSlice.reducer;
