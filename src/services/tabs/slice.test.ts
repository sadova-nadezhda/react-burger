import reducer, { initialState, setCurrentTab } from './slice';

describe('tabsSlice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle setCurrentTab', () => {
    const state = reducer(initialState, setCurrentTab('sauce'));
    expect(state.currentTab).toBe('sauce');

    const newState = reducer(state, setCurrentTab('main'));
    expect(newState.currentTab).toBe('main');
  });
});
