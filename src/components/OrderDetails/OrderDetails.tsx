import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import done from '../../images/done.svg';

import s from './OrderDetails.module.scss';

import { setOrderDetails } from '../../services/order/slice';

export default function OrderDetails() {
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const dispatch = useDispatch();

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
