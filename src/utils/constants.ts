export const BASE_URL = 'https://norma.nomoreparties.space/api';

export const wsActions = {
  wsInit: "WS/INIT",
  wsClose: "WS/CLOSE",
  wsConnect: "WS/CONNECT",
  wsDisconnect: "WS/DISCONNECT",
  wsError: "WS/ERROR",
  wsMessage: "WS/MESSAGE",
};

export const WS_URL = "wss://norma.nomoreparties.space/orders/all";
export const WS_USER_URL = "wss://norma.nomoreparties.space/orders?token=";