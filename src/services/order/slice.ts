import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrder } from './actions';

interface OrderState {
  orderDetails: { number: number } | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderDetails: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderDetails(state, action: PayloadAction<{ number: number }>) {
      state.orderDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<{ number: number }>) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload ?? 'Ошибка при загрузке заказа';
      });
  },
});

export const { setOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;