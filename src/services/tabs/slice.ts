import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TabsState {
  currentTab: string;
}

export const initialState: TabsState = {
  currentTab: 'bun',
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<string>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = tabsSlice.actions;
export default tabsSlice.reducer;