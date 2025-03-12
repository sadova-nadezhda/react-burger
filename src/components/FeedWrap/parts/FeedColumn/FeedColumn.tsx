import React from 'react';
import classNames from 'classnames';

import s from './FeedColumn.module.scss';

interface FeedColumnProps {
  title: string;
  items: string[];
  isDone?: boolean;
}

export default function FeedColumn({ title, items, isDone = false }: FeedColumnProps) {
  return (
    <div className={s.feed__col}>
    <h4 className={classNames(s.feed__caption, 'mb-6 text_type_main-medium')}>{title}:</h4>
    <ul className={classNames(s.feed__list, { [s.feed__list_done]: isDone }, 'text_type_digits-default')}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
  )
}
