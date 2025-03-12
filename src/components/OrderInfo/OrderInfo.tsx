import React, { useEffect, useMemo } from 'react';
import classNames from 'classnames';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderCard from './parts/OrderCard';

import { useAppDispatch, useAppSelector } from '../../hooks/store';

import s from './OrderInfo.module.scss';

export default function OrderInfo() {
  const dispatch = useAppDispatch();
  const selectedOrder = useAppSelector((state) => state.orders.currentOrder);
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);

  const ingredientsMap = useMemo(() => {
    return Object.fromEntries(ingredients.map((ing) => [ing._id, ing]));
  }, [ingredients]);
  
  useEffect(() => {
    dispatch({ type: 'websocket/start' });
    return () => dispatch({ type: 'websocket/stop' });
  }, [dispatch]);

  const total = useMemo(() => {
    if (!selectedOrder || !selectedOrder.ingredients) return 0;
    return selectedOrder.ingredients.reduce((sum, ingredientId) => sum + (ingredientsMap[ingredientId]?.price || 0), 0);
  }, [selectedOrder, ingredientsMap]);

  if (!selectedOrder) return <p>Загрузка заказа...</p>;

  return (
    <div className={classNames(s.order, 'text text_type_main-default')}>
      <div className={classNames(s.order__number, 'mb-10 text_type_digits-default')}>#{selectedOrder.number}</div>
      <h4 className={classNames(s.order__caption, 'mb-3 text_type_main-medium')}>{selectedOrder.name}</h4>
      <div className={classNames(s.order__status, 'mb-15')}>
        {selectedOrder.status === 'done' ? (
          <span className={s.order__done}>Выполнен</span>
        ) : (
          <span className={s.order__prepare}>Готовится</span>
        )}
      </div>

      <div className={s.order__compound}>
        <h4 className={classNames(s.order__caption, 'mb-6 text_type_main-medium')}>Состав:</h4>
        <div className={classNames(s.order__cards, 'mb-10')}>
          {selectedOrder.ingredients.map((id, index) => {
            const ingredient = ingredientsMap[id];
            return ingredient ? <OrderCard key={id + index} ingredient={ingredient} /> : null;
          })}
        </div>
      </div>
      <div className={s.order__bottom}>
        <div className={classNames(s.order__datetime, 'text_color_inactive')}>
          <FormattedDate date={new Date(selectedOrder.createdAt)} />
        </div>
        <div className={classNames(s.order__total, 'text_type_digits-default')}>
          {total} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}