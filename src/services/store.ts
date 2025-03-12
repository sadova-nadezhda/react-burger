import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/slice';
import burgerConstructorReducer from './burger-constructor/slice';
import ordersReducer from './order/slice';
import tabsReducer from './tabs/slice';
import authReducer from './auth/slice';
import { wsMiddleware } from './order/actions';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    orders: ordersReducer,
    tabs: tabsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(wsMiddleware),
});

export type AppDispatch = typeof store.dispatch; 
export type RootState = ReturnType<typeof store.getState>; 

export default store;
