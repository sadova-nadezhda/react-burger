import React from 'react';

import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import s from './IngredientsCard.module.scss';

interface IngredientsCard {
  name: string,
  price: number,
  img: string,
  onClick: () => void;
}

export default function IngredientsCard({img, price, name, onClick}: IngredientsCard) {
  return (
    <div className={s.card} onClick={onClick} >
      <Counter count={0} size="default" extraClass="m-1" />
      <div className={classNames(s.card__img)}><img src={img} alt="" /></div>
      <div className={classNames(s.card__price, 'text text_type_digits-default')}>
        {price}
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={classNames(s.card__caption, 'text text_type_main-default')}>{name}</h4>
    </div>
  )
}
