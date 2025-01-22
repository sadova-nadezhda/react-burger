import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронный экшен для отправки запроса на создание заказа
export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async ({ ingredients }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при оформлении заказа');
      }

      const data = await response.json();
      return data.order; // Возвращаем order из ответа
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
