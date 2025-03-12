import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderCard from './parts/OrderCard';

import s from './OrderInfo.module.scss';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';
const API_INGREDIENTS = 'https://norma.nomoreparties.space/api/ingredients';

export default function OrderInfo() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    fetch(API_INGREDIENTS)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIngredients(
            data.data.reduce((acc, item) => {
              acc[item._id] = item;
              return acc;
            }, {})
          );
        }
      })
      .catch((error) => console.error('Ошибка загрузки ингредиентов:', error));
  }, []);

  useEffect(() => {
    const socket = new WebSocket(WS_URL);
    setWs(socket);

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Ошибка обработки WebSocket:', error);
      }
    };

    socket.onerror = (error) => console.error('Ошибка WebSocket:', error);
    socket.onclose = () => console.log('WebSocket закрыт');

    return () => socket.close();
  }, []);

  const order = useMemo(() => orders.find((o) => o._id === id), [orders, id]);

  const total = useMemo(() => {
    if (!order || !order.ingredients) return 0;
    return order.ingredients.reduce((sum, ingredientId) => sum + (ingredients[ingredientId]?.price || 0), 0);
  }, [order, ingredients]);

  if (!order) return <p>Загрузка заказа...</p>;

  return (
    <div className={classNames(s.order, 'text text_type_main-default')}>
      <div className={classNames(s.order__number, 'mb-10 text_type_digits-default')}>#{order.number}</div>
      <h4 className={classNames(s.order__caption, 'mb-3 text_type_main-medium')}>{order.name}</h4>
      <div className={classNames(s.order__status, 'mb-15')}>
        {order.status === 'done' ? (
          <span className={s.order__done}>Выполнен</span>
        ) : (
          <span className={s.order__prepare}>Готовится</span>
        )}
      </div>

      <div className={s.order__compound}>
        <h4 className={classNames(s.order__caption, 'mb-6 text_type_main-medium')}>Состав:</h4>
        <div className={classNames(s.order__cards, 'mb-10')}>
          {order.ingredients.map((ingredientId) => {
            const ingredient = ingredients[ingredientId];
            return ingredient ? <OrderCard key={ingredientId} ingredient={ingredient} /> : null;
          })}
        </div>
      </div>
      <div className={s.order__bottom}>
        <div className={classNames(s.order__datetime, 'text_color_inactive')}>
          <FormattedDate date={new Date(order.createdAt)} />
        </div>
        <div className={classNames(s.order__total, 'text_type_digits-default')}>
          {total} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}