import { createAsyncThunk, Middleware } from "@reduxjs/toolkit";
import { request } from '../../utils/request';
import { TWsActions } from "../../types/wsActionsTypes";
import { Order } from "../../types/OrderTypes";
import { wsConnect, wsDisconnect, wsError, wsMessage } from "./slice";
import { refreshToken } from "../auth/actions";

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async ({ ingredients }: { ingredients: string[] }) => {
    const token = localStorage.getItem('accessToken');

    const response: { order: Order } = await request('/orders', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify({ ingredients }),
    });

    return response.order;
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId: string) => {
    const token = localStorage.getItem("accessToken");

    const response: { orders: Order[] } = await request(`/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
    });

    return response.orders[0];
  }
);

export const wsMiddleware = (wsActions: TWsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => async (action) => {
      const { type, payload } = action as { type: string; payload?: any };

      if (type === wsActions.wsInit) {
        if (socket) {
          console.warn("WebSocket уже открыт, пропускаем инициализацию");
          return;
        }

        let token = localStorage.getItem('accessToken');
        const wsUrl = token ? `${payload.url}?token=${token}` : payload.url;

        socket = new WebSocket(wsUrl);

        if(socket) {
          socket.onopen = () => store.dispatch(wsConnect());

          socket.onclose = () => {
            store.dispatch(wsDisconnect());
            setTimeout(() => store.dispatch({ type: "websocket/start", payload: { url: action.payload?.url } }), 5000);
          };
          socket.onerror = () => store.dispatch(wsError("Ошибка WebSocket"));
  
          socket.onmessage = async (event) => {
            const data = JSON.parse(event.data);
  
            if (data.message === "Invalid or missing token") {
              console.warn("WebSocket: токен устарел, обновляем...");
              store.dispatch(wsError("Токен устарел, обновляем..."));
              try {
                store.dispatch(refreshToken()); 
                token = localStorage.getItem('accessToken');
                if (token) {
                  socket?.close();
                  store.dispatch({ type: "websocket/start", payload });
                } 
              }
              catch (error) {
                  console.error("Ошибка обновления токена:", error);
              }
                
              return; 
            }
  
            if (data.success && Array.isArray(data.orders)) {
              const validOrders = data.orders.filter((order) =>
                Array.isArray(order.ingredients) && 
                order.ingredients.length > 0 &&
                order._id &&
                typeof order.status === "string"
              );
  
              store.dispatch(wsMessage({ 
                orders: validOrders, 
                total: data.total, 
                totalToday: data.totalToday 
              }));
            } else {
              console.warn("Некорректный формат данных WebSocket", data);
            }
          }
        }
      }

      if (type === wsActions.wsClose && socket) {
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };
};