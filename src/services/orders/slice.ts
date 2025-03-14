import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOrder, fetchOrderById } from './actions';
import { Order } from '../../types/OrderTypes';

interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  currentOrder: Order | null;
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
  currentOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialState,
  reducers: {
    setOrderDetails(state, action: PayloadAction<Order | null>) {
      state.orderDetails = action.payload;
    },
    setCurrentOrder: (state, action: PayloadAction<Order | null>) => {
      state.currentOrder = action.payload;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
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
      if (Array.isArray(action.payload.orders)) {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      } else {
        console.warn("wsMessage получил некорректные данные", action.payload);
      }
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
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  setOrderDetails, 
  setCurrentOrder, 
  clearCurrentOrder, 
  clearOrders, 
  wsConnect, 
  wsDisconnect, 
  wsError, 
  wsMessage } = ordersSlice.actions;

export default ordersSlice.reducer;
