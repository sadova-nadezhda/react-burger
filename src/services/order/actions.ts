import { createAsyncThunk } from "@reduxjs/toolkit";

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