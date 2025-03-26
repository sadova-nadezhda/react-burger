import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import OrderInfo from '../../components/OrderInfo';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setCurrentOrder } from '../../services/orders/slice';

import s from './OrderPage.module.scss';
import { fetchOrderById } from '../../services/orders/actions';


export default function OrderPage() {
  const { number } = useParams();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(()=>{
    if(!orders || !number) return
    const order = orders.find((item) => item.number === +number);
    if(!order) {
      dispatch(fetchOrderById(number))
      return
    }
    dispatch(setCurrentOrder(order));
  }, [orders, number, dispatch])
  
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
