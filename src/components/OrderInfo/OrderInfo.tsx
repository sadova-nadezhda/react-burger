import React, { useMemo } from 'react';
import classNames from 'classnames';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import OrderCard from './parts/OrderCard';

import { useAppSelector } from '../../hooks/store';

import s from './OrderInfo.module.scss';

export default function OrderInfo() {
  const order = useAppSelector((state) => state.orders.currentOrder);
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);

  const ingredientsMap = useMemo(() => {
    return Object.fromEntries(ingredients.map((ing) => [ing._id, ing]));
  }, [ingredients]);

    const groupedIngredients = useMemo(() => {
      if (!order || !order.ingredients) return {};
  
      return order.ingredients.reduce((acc, id) => {
        if (!ingredientsMap[id]) return acc;
        if (!acc[id]) {
          acc[id] = { ingredient: ingredientsMap[id], count: 1 };
        } else {
          acc[id].count += 1;
        }
        return acc;
      }, {} as Record<string, { ingredient: typeof ingredientsMap[string]; count: number }>);
    }, [order, ingredientsMap]);
  
    const total = useMemo(() => {
      return Object.values(groupedIngredients).reduce(
        (sum, { ingredient, count }) => sum + ingredient.price * count,
        0
      );
    }, [groupedIngredients]);

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
          { Object.values(groupedIngredients).map(({ ingredient, count }) => (
            <OrderCard key={ingredient._id} ingredient={ingredient} count={count} />
          )) }
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