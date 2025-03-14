import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';

import FeedCards from '../FeedCards';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { WS_USER_URL } from '../../utils/constants';

import s from './OrdersHistory.module.scss';


export default function OrdersHistory() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);

  useEffect(() => {
    dispatch({ type: "websocket/start", payload: { url: WS_USER_URL } });

    return () => {
      dispatch({ type: "websocket/stop" });
    };
  }, [dispatch]);

  const ingredientsMap = useMemo(() => {
    return Object.fromEntries(ingredients.map((ing) => [ing._id, ing]));
  }, [ingredients]);

  const calculateOrderPrice = (order) => {
    return order.ingredients.reduce((sum, id) => sum + (ingredientsMap[id]?.price || 0), 0);
  };

  const mappedOrders = orders.map((order) => {
    const processedOrder = {
      price: calculateOrderPrice(order),
      images: order.ingredients
        .map((id) => ingredientsMap?.[id]?.image || '')
        .filter((image) => image),
      originalOrder: order,
    };
  
    if (!processedOrder.originalOrder) {
      console.warn('Отсутствует originalOrder в заказе', processedOrder);
    }
  
    return processedOrder;
  });

  return (
    <div className={classNames(s.orders, 'text text_type_main-default')}>
      <FeedCards
        orders={mappedOrders}
        isProfile
      />
    </div>
  )
}
