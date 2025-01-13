import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    resetOrder(state) {
      state.orderDetails = null;
    }
  }
});

export const { setOrderDetails, resetOrder } = orderSlice.actions;

export default orderSlice.reducer;
