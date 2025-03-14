import { createAsyncThunk, Middleware } from "@reduxjs/toolkit";
import { request } from '../../utils/request';
import { wsConnect, wsDisconnect, wsError, wsMessage } from "./slice";
import { refreshToken } from "../../services/auth/actions";

const WS_URL = "wss://norma.nomoreparties.space/orders/all";
const WS_USER_URL = "wss://norma.nomoreparties.space/orders?token=";

export const fetchOrder = createAsyncThunk(
  'order/fetchOrder',
  async ({ ingredients }: { ingredients: string[] }) => {
    const data = await request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients }),
    });
    return data.order;
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (orderId: string) => {
    const response = await request(`/orders/${orderId}`);
    return response.orders[0];
  }
);

// export const wsMiddleware: Middleware = (store) => {
//   let socket: WebSocket | null = null;

//   return (next) => async (action) => {
//     if (action.type === "websocket/start") {
//       let token = store.getState().auth.accessToken; 
//       const isProfile = action.payload?.isProfile;
//       const wsUrl = isProfile ? `${WS_USER_URL}${token}` : WS_URL;

//       socket = new WebSocket(wsUrl);

//       socket.onopen = () => store.dispatch(wsConnect());

//       socket.onclose = () => {
//         store.dispatch(wsDisconnect());
//         setTimeout(() => store.dispatch({ type: "websocket/start", payload: { isProfile } }), 5000);
//       };

//       socket.onerror = () => store.dispatch(wsError("Ошибка WebSocket"));

//       socket.onmessage = async (event) => {
//         const data = JSON.parse(event.data);

//         if (data.message === "Invalid or missing token") {
//           console.warn("WebSocket: токен устарел, обновляем...");
//           store.dispatch(wsError("Токен устарел, обновляем..."));
          
//           try {
//             await store.dispatch(refreshToken()); 
//             token = store.getState().auth.accessToken;
//             if (token) {
//               socket?.close();
//               store.dispatch({ type: "websocket/start", payload: { isProfile } }); // Переподключаем WS
//             }
//           } catch (error) {
//             console.error("Ошибка обновления токена:", error);
//           }
//           return;
//         }

//         if (data.success && Array.isArray(data.orders)) {
//           store.dispatch(wsMessage(data));
//         } else {
//           console.warn("Некорректный формат данных WebSocket", data);
//         }
//       };
//     }

//     if (action.type === "websocket/stop" && socket) {
//       socket.close();
//       socket = null;
//     }

//     return next(action);
//   };
// };

export const wsMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => async (action) => {
    if (action.type === "websocket/start") {
      let token = store.getState().auth.accessToken;
      const isProfile = action.payload?.isProfile;
      const wsUrl = isProfile ? `${WS_USER_URL}${token}` : WS_URL;

      socket = new WebSocket(wsUrl);

      socket.onopen = () => store.dispatch(wsConnect());

      socket.onclose = () => {
        store.dispatch(wsDisconnect());
        setTimeout(() => store.dispatch({ type: "websocket/start", payload: { isProfile } }), 5000);
      };

      socket.onerror = () => store.dispatch(wsError("Ошибка WebSocket"));

      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data);

        if (data.message === "Invalid or missing token") {
          console.warn("WebSocket: токен устарел, обновляем...");
          store.dispatch(wsError("Токен устарел, обновляем..."));
          
          try {
            await store.dispatch(refreshToken()); 
            token = store.getState().auth.accessToken;
            if (token) {
              socket?.close();
              store.dispatch({ type: "websocket/start", payload: { isProfile } });
            }
          } catch (error) {
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
      };
    }

    if (action.type === "websocket/stop" && socket) {
      socket.close();
      socket = null;
    }

    return next(action);
  };
};