import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {fetchOrder} from './actions';
import { Order } from '../../types/OrderTypes';

interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  total: number;
  totalToday: number;
  connected: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false,
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
    wsConnect(state) {
      state.connected = true;
      state.error = null;
    },
    wsDisconnect(state) {
      state.connected = false;
    },
    wsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.connected = false;
    },
    wsMessage(
      state,
      action: PayloadAction<{ orders: Order[]; total: number; totalToday: number }>
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
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

export const { setOrderDetails, clearOrders, wsConnect, wsDisconnect, wsError, wsMessage } = orderSlice.actions;

export default orderSlice.reducer;
