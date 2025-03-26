import reducer, {
  setOrderDetails,
  setCurrentOrder,
  clearCurrentOrder,
  clearOrders,
  wsConnect,
  wsDisconnect,
  wsError,
  wsMessage,
  initialState,
} from './slice';

jest.mock('../../utils/request', () => ({
  request: jest.fn(),
}));

const order1 = { _id: '1', name: 'Order 1', status: 'done' };
const order2 = { _id: '2', name: 'Order 2', status: 'pending' };

describe('ordersSlice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setOrderDetails', () => {
    const state = reducer(initialState, setOrderDetails(order1));
    expect(state.orderDetails).toEqual(order1);
  });

  it('should handle setCurrentOrder', () => {
    const state = reducer(initialState, setCurrentOrder(order1));
    expect(state.currentOrder).toEqual(order1);
  });

  it('should handle clearCurrentOrder', () => {
    const state = { ...initialState, currentOrder: order1 };
    const newState = reducer(state, clearCurrentOrder());
    expect(newState.currentOrder).toBeNull();
  });

  it('should handle clearOrders', () => {
    const state = { ...initialState, orders: [order1, order2], orderDetails: order1 };
    const newState = reducer(state, clearOrders());
    expect(newState.orders).toEqual([]);
    expect(newState.orderDetails).toBeNull();
  });

  it('should handle wsConnect', () => {
    const state = reducer(initialState, wsConnect());
    expect(state.connected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle wsDisconnect', () => {
    const state = { ...initialState, connected: true };
    const newState = reducer(state, wsDisconnect());
    expect(newState.connected).toBe(false);
  });

  it('should handle wsError', () => {
    const state = reducer(initialState, wsError('Ошибка'));
    expect(state.error).toBe('Ошибка');
    expect(state.connected).toBe(false);
  });

  it('should handle wsMessage', () => {
    const payload = { orders: [order1, order2], total: 100, totalToday: 10 };
    const state = reducer(initialState, wsMessage(payload));
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });
});
