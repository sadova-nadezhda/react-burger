import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './OrderCard.module.scss';
import classNames from 'classnames';

export default function OrderCard( { ingredient }) {
  return (
    <div className={s.card}>
      <div className={s.card__img}><img src={ingredient.image} alt="" /></div>
      <h4 className={s.card__caption}>{ingredient.name}</h4>
      <div className={classNames(s.card__price, 'text_type_digits-default')}>
        1 x {ingredient.price}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}
