import { createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '../../utils/request';

interface FetchOrderPayload {
  ingredients: string[];
}

interface OrderResponse {
  order: {
    number: number;
  };
}

export const fetchOrder = createAsyncThunk<OrderResponse['order'], FetchOrderPayload, { rejectValue: string }>(
  'order/fetchOrder',
  async ({ ingredients }, { rejectWithValue }) => {
    try {
      const data: OrderResponse = await request('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });
      return data.order;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);