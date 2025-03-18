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

    console.log(response)

    return response.orders[0];
  }
);

export const wsMiddleware = (wsActions: TWsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let shouldReconnect = false;
    let reconnectTimer = 0;

    const connect = (url: string) => {
      socket = new WebSocket(url);

      socket.onopen = () => store.dispatch(wsConnect());
      socket.onclose = () => {
        store.dispatch(wsDisconnect());
        socket = null;
  
        if (shouldReconnect) {
          reconnectTimer = window.setTimeout(() => {
          store.dispatch({ type: wsActions.wsInit, payload: {url} })
        }, 5000);
        }
      }
      socket.onerror = () => store.dispatch(wsError("Ошибка WebSocket"));
      socket.onmessage = async (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (!data) throw new Error("Некорректные данные");
  
          if (data.message === "Invalid or missing token") {
            store.dispatch(wsError("Токен устарел, обновляем..."));
            try {
              const newToken = await refreshToken();
              if (newToken) {
                shouldReconnect = true;
                socket?.close();
                const wssUrl = new URL(url);
                wssUrl.searchParams.set(
                  "token",
                  newToken
                );
                store.dispatch({ type: wsActions.wsInit, payload: { url: wssUrl } });
              }
            } catch (error) {
              console.error("Ошибка обновления токена:", error);
              shouldReconnect = false;
              socket?.close();
            }
            return;
          }
  
          if (data.success) {
            store.dispatch(wsMessage({
              orders: data.orders,
              total: data.total,
              totalToday: data.totalToday,
            }));
          } else {
            console.warn("Некорректный формат данных WebSocket", data);
          }
        } catch (error) {
          console.warn("WebSocket: ошибка обработки сообщения", error);
        }
      };
    };


    return (next) => (action) => {
      const { type, payload } = action;

      if (type === wsActions.wsInit) {
        if (!socket) {
          shouldReconnect = true;
          connect(payload.url);
        } else {
          console.warn("WebSocket уже открыт, пропускаем инициализацию");
        }
      }

      if (type === wsActions.wsClose && socket) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        shouldReconnect = false;
        socket.close();
        socket = null;
      }

      return next(action);
    };
  };
};
