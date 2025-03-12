import React from 'react';
import classNames from 'classnames';

import s from './FeedWrap.module.scss';

export default function FeedWrap() {
  return (
    <div className={classNames(s.feed, 'text text_type_main-default')}>
      <div className={classNames(s.feed__row, 'mb-15')}>
        <div className={classNames(s.feed__col)}>
          <h4 className={classNames(s.feed__caption, 'mb-6 text_type_main-medium')}>Готовы:</h4>
          <ul className={classNames(s.feed__list, s.feed__list_done, 'text_type_digits-default')}>
            <li>034533</li>
            <li>034532</li>
            <li>034530</li>
            <li>034527</li>
            <li>034525</li>
          </ul>
        </div>
        <div className={classNames(s.feed__col)}>
          <h4 className={classNames(s.feed__caption, 'mb-6 text_type_main-medium')}>В работе:</h4>
          <ul className={classNames(s.feed__list, 'text_type_digits-default')}>
            <li>034538</li>
            <li>034541</li>
            <li>034542</li>
          </ul>
        </div>
      </div>
      <div className={classNames(s.feed__card, 'mb-15')}>
        <h4 className={classNames(s.feed__caption, 'text_type_main-medium')}>Выполнено за все время:</h4>
        <div className={classNames(s.feed__number, 'text_type_digits-large')}>28 752</div>
      </div>
      <div className={classNames(s.feed__card, 'mb-15')}>
        <h4 className={classNames(s.feed__caption, 'text_type_main-medium')}>Выполнено за сегодня:</h4>
        <div className={classNames(s.feed__number, 'text_type_digits-large')}>138</div>
      </div>
    </div>
  )
}
