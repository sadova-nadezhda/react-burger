import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from '../../utils/request';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async ({ ingredients }, { rejectWithValue }) => {
    try {
      const data = await request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);