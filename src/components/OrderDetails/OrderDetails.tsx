import React, { useEffect } from 'react';
import classNames from 'classnames';

import { setOrderDetails } from '../../services/order/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/store';

import done from '../../images/done.svg';

import s from './OrderDetails.module.scss';

export default function OrderDetails() {
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector((state) => state.order.orderDetails);

  useEffect(() => {
    if (!orderDetails) {
      dispatch(setOrderDetails({ number: '034536' }));
    }
  }, [dispatch, orderDetails]);

  if (!orderDetails) {
    return <div>Загрузка...</div>; 
  }

  return (
    <>
      <div className={classNames(s.order__number, 'mb-8 text_type_digits-large')}>{orderDetails.number}</div>
      <span className='mb-15 text_type_main-medium'>идентификатор заказа</span>
      <div className={classNames(s.order__icon, 'mb-15')}>
        <img src={done} alt="Order Image" />
      </div>
      <div className='mb-2'>Ваш заказ начали готовить</div>
      <div className='text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
    </>
  )
}
