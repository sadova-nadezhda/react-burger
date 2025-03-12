import React from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './FeedCard.module.scss';
import classNames from 'classnames';

export default function FeedCard() {
  const today = new Date()
  return (
    <div className={classNames(s.card, 'text text_type_main-default')}>
      <div className={classNames(s.card__top, s.card__row)}>
        <div className={classNames(s.card__order, 'text_type_digits-default')}>#034535</div>
        <div className={classNames(s.card__datetime, 'text_color_inactive')}>
          <FormattedDate
            date={
              new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate(),
                today.getHours(),
                today.getMinutes() - 1,
                0,
              )
            }
          />
        </div>
      </div>
      <h4 className={classNames(s.card__caption, 'text_type_main-medium')}>Death Star Starship Main бургер</h4>
      <div className={classNames(s.card__bottom, s.card__row)}>
        <div className={s.card__ingredients}>
          <div className={s.card__item}><img src="https://code.s3.yandex.net/react/code/sauce-02.png" alt="" /></div>
          <div className={s.card__item}><img src="https://code.s3.yandex.net/react/code/sauce-02.png" alt="" /></div>
          <div className={s.card__item}><img src="https://code.s3.yandex.net/react/code/sauce-02.png" alt="" /></div>
          <div className={s.card__item}><img src="https://code.s3.yandex.net/react/code/sauce-02.png" alt="" /></div>
        </div>
        <div className={classNames(s.card__total, s.card__row, 'text_type_digits-default')}>
          480
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
