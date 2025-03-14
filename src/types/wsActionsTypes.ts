export interface TWsActions {
  wsInit: string;
  wsClose: string;
  wsConnect: string;
  wsDisconnect: string;
  wsError: string;
  wsMessage: string;
}

export interface TWsInitAction {
  type: string;
  payload: {isProfile:boolean, url: string};
}