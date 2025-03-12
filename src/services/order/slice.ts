import { createSlice } from '@reduxjs/toolkit';
import {fetchOrder} from './actions';
import { Order } from '../../types/OrderTypes';

interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderDetails: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialState,
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    clearOrders(state) {
      state.orderDetails = null;
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
        state.error = action.payload as string;
      });
  },
});

export const { setOrderDetails, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
