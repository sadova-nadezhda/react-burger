import React from 'react';
import classNames from 'classnames';

import OrderInfo from '../../components/OrderInfo';

import s from './OrderPage.module.scss';

export default function OrderPage() {
  return (
    <section className={classNames(s.order, 'pt-30 pb-30')}>
      <div className={s.container}>
        <div className={s.order__container}>
          <OrderInfo />
        </div>
      </div>
    </section>
  )
}
