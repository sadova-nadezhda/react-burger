import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';

import FeedCards from '../../components/FeedCards';
import FeedWrap from '../../components/FeedWrap';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { Order } from '../../types/OrderTypes';

import s from './FeedPage.module.scss';

export default function FeedPage() {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector((state) => state.orders);
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);
  
  const ingredientsMap = useMemo(() => {
    return Object.fromEntries(ingredients.map((ing) => [ing._id, ing]));
  }, [ingredients]);

  useEffect(() => {
    dispatch({ type: 'websocket/start' });
    return () => dispatch({ type: 'websocket/stop' });
  }, [dispatch]);

  const calculateOrderPrice = (order: Order) => {
    return order.ingredients.reduce((sum, id) => {
      const ingredient = ingredientsMap?.[id];
      return sum + (ingredient?.price || 0);
    }, 0);
  };

  const doneOrders = orders.filter((order) => order.status === 'done').slice(0, 10);
  const inProgressOrders = orders.filter((order) => order.status !== 'done').slice(0, 10);

  return (
    <main>
      <section className={classNames(s.feed, 'pt-10 pb-10')}>
        <div className={s.container}>
          <div className={s.feed__container}>
            <h1 className='mb-5 text text_type_main-large'>Лента заказов</h1>
            <div className={s.feed__wrap}>
              <FeedCards
                orders={orders.map((order) => ({
                  orderNumber: order.number,
                  title: `Заказ №${order.number}`,
                  price: calculateOrderPrice(order),
                  images: order.ingredients
                    .map((id) => ingredientsMap?.[id]?.image || '')
                    .filter((image) => image),
                }))}
              />
              <FeedWrap
                doneOrders={doneOrders.map((order) => order.number.toString())}
                inProgressOrders={inProgressOrders.map((order) => order.number.toString())}
                total={total}
                today={totalToday}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}