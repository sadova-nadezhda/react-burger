// services/order/slice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderDetails: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
    },
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
});

export const { setOrderDetails, resetOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
