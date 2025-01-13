import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/slice';
import burgerConstructorReducer from './burger-constructor/slice';
import orderReducer from './order/slice';
import tabsReducer from './tabs/slice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    tabs: tabsReducer,
  },
});

export type AppDispatch = typeof store.dispatch; 
export type RootState = ReturnType<typeof store.getState>; 

export default store;
