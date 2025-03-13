import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import OrderInfo from '../../components/OrderInfo';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setCurrentOrder } from '../../services/order/slice';

import s from './OrderPage.module.scss';


export default function OrderPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(()=>{
    if(!orders) return
    const order = orders.find((item) => item._id === id);
    if(!order) return 
    dispatch(setCurrentOrder(order));
  }, [orders])
  
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
