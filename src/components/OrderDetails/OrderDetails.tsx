import React from 'react';
import classNames from 'classnames';
import done from '../../images/done.svg';

import s from './OrderDetails.module.scss';

export default function OrderDetails() {
  return (
    <>
      <div className={classNames(s.order__number, 'mb-8 text_type_digits-large')}>034536</div>
      <span className='mb-15 text_type_main-medium'>идентификатор заказа</span>
      <div className={classNames(s.order__icon, 'mb-15')}>
        <img src={done} alt="" />
      </div>
      <div className='mb-2'>Ваш заказ начали готовить</div>
      <div className='text_color_inactive'>Дождитесь готовности на орбитальной станции</div>
    </>
  )
}
