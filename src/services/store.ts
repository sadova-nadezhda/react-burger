import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients/slice';
import orderReducer from './order/slice';
import burgerConstructorReducer from './burger-constructor/slice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    order: orderReducer,
    burgerConstructor: burgerConstructorReducer
  },
  devTools: process.env.NODE_ENV !== 'production' 
});

export default store;
