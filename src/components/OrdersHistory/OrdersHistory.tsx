import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import FeedCards from '../FeedCards';

import { useAppDispatch, useAppSelector } from '../../hooks/store';

import s from './OrdersHistory.module.scss';

export default function OrdersHistory() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);

  const ingredientsMap = useMemo(() => {
    return Object.fromEntries(ingredients.map((ing) => [ing._id, ing]));
  }, [ingredients]);

  useEffect(() => {
    dispatch({ type: 'websocket/start' });
    return () => dispatch({ type: 'websocket/stop' });
  }, [dispatch]);

  const calculateOrderPrice = (order) => {
    return order.ingredients.reduce((sum, id) => sum + (ingredientsMap[id]?.price || 0), 0);
  };

  return (
    <div className={classNames(s.orders, 'text text_type_main-default')}>
      <FeedCards
        orders={orders.map(order => ({
          orderNumber: order.number,
          title: `Заказ №${order.number}`,
          price: calculateOrderPrice(order),
          images: order.ingredients.map(id => ingredientsMap[id]?.image).filter(Boolean),
        }))}
      />
    </div>
  )
}
