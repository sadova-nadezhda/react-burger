import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import FeedCards from '../../components/FeedCards';
import FeedWrap from '../../components/FeedWrap';

import { useAppSelector } from '../../hooks/store';

import s from './FeedPage.module.scss';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';

export default function FeedPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);
  const ingredientsMap = Object.fromEntries(ingredients.map(ing => [ing._id, ing]));


  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        setOrders(data.orders);
        setTotal(data.total);
        setTotalToday(data.totalToday);
      }
    };
    return () => ws.close();
  }, []);

  const calculateOrderPrice = (order) => {
    if (!ingredientsMap) return 0;
    return order.ingredients.reduce((sum, id) => {
      const ingredient = ingredientsMap?.[id];
      return sum + (ingredient?.price || 0);
    }, 0);
  };

  const doneOrders = orders.filter(order => order.status === 'done').slice(0, 10);
  const inProgressOrders = orders.filter(order => order.status !== 'done').slice(0, 10);

  return (
    <main>
      <section className={classNames(s.feed, 'pt-10 pb-10')}>
        <div className={s.container}>
          <div className={s.feed__container}>
            <h1 className='mb-5 text text_type_main-large'>Лента заказов</h1>
            <div className={s.feed__wrap}>
              <FeedCards
                orders={orders.map(order => ({
                  orderNumber: order.number,
                  title: `Заказ №${order.number}`,
                  price: calculateOrderPrice(order),
                  images: order.ingredients
                    .map(id => ingredientsMap?.[id]?.image || '')
                    .filter(image => image), 
                }))}
              />
              <FeedWrap 
                doneOrders={doneOrders.map(order => order.number.toString())}
                inProgressOrders={inProgressOrders.map(order => order.number.toString())}
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