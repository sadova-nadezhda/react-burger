import { createAsyncThunk, Middleware } from "@reduxjs/toolkit";
import { request } from '../../utils/request';
import { wsConnect, wsDisconnect, wsError, wsMessage } from "./slice";

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async ({ ingredients }: { ingredients: string[] }, { rejectWithValue }) => {
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

export const wsMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    if (action.type === 'websocket/start') {
      socket = new WebSocket(WS_URL);

      socket.onopen = () => store.dispatch(wsConnect());
      socket.onclose = () => store.dispatch(wsDisconnect());
      socket.onerror = () => store.dispatch(wsError('Ошибка WebSocket'));

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log("WebSocket received:", data); 
      
        if (data.success && Array.isArray(data.orders)) {
          store.dispatch(wsMessage(data));
        } else {
          console.warn("Некорректный формат данных WebSocket", data);
        }
      };
    }

    if (action.type === 'websocket/stop' && socket) {
      socket.close();
      socket = null;
    }

    return next(action);
  };
};