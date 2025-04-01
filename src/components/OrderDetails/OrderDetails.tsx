import { useEffect } from 'react';
import classNames from 'classnames';

import { fetchOrder } from '../../services/orders/actions'; 
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { resetConstructor } from '../../services/burger-constructor/slice';
import { resetAllIngredientCounts } from '../../services/ingredients/slice';

import done from '../../images/done.svg';

import s from './OrderDetails.module.scss';

interface OrderDetailsProps {
  ingredients : string[];
}

export default function OrderDetails({ ingredients } : OrderDetailsProps) {
  const dispatch = useAppDispatch();
  const orderDetails = useAppSelector((state) => state.orders.orderDetails);
  const orderError = useAppSelector((state) => state.orders.error);

  useEffect(() => {
    if (ingredients && ingredients.length > 0) {
      dispatch(fetchOrder({ ingredients })).then(() => {
        dispatch(resetConstructor());
        dispatch(resetAllIngredientCounts());
      });
    }
  }, [dispatch, ingredients]);
  

  if (!orderDetails) {
    return <div>Загрузка...</div>; 
  }

  if (orderError) {
    return <div className="text_color_error">Ошибка оформления заказа: {orderError}</div>;
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
  );
}
