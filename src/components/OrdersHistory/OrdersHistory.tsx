import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import FeedCards from '../FeedCards';

import s from './OrdersHistory.module.scss';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export default function OrdersHistory() {
  const [orders, setOrders] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);

  useEffect(() => {
    fetch(API_INGREDIENTS)
      .then((res) => res.json())
      .then((data) => {
        const ingredientsMap = data.data.reduce((acc, item) => {
          acc[item._id] = item;
          return acc;
        }, {});
        setIngredients(ingredientsMap);
      });
  }, []);

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
    return order.ingredients.reduce((sum, id) => sum + (ingredients[id]?.price || 0), 0);
  };

  return (
    <div className={classNames(s.orders, 'text text_type_main-default')}>
      <FeedCards
        orders={orders.map(order => ({
          orderNumber: order.number,
          title: `Заказ №${order.number}`,
          price: calculateOrderPrice(order),
          images: order.ingredients.map(id => ingredients[id]?.image).filter(Boolean),
        }))}
      />
    </div>
  )
}
