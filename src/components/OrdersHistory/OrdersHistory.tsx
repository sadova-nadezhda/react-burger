import React from 'react';

import s from './OrdersHistory.module.scss';
import classNames from 'classnames';

export default function OrdersHistory() {
  return (
    <div className={classNames(s.orders, 'text text_type_main-default')}>
      <h1 className={classNames(s.orders__title, 'text_type_main-large mb-10')}>История заказов</h1>
      <p>Здесь будет список ваших заказов.</p>
    </div>
  )
}
