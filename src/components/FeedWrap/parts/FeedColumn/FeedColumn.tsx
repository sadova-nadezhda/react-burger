import React from 'react';
import classNames from 'classnames';

import s from './FeedColumn.module.scss';

interface FeedColumnProps {
  title: string;
  items: string[];
  isDone?: boolean;
}

const splitOrdersIntoColumns = (orders: string[], itemsPerColumn = 7) => {
  const columns = [];
  for (let i = 0; i < orders.length; i += itemsPerColumn) {
    columns.push(orders.slice(i, i + itemsPerColumn));
  }
  return columns;
};

export default function FeedColumn({ title, items, isDone = false }: FeedColumnProps) {
  const list = splitOrdersIntoColumns(items);
  return (
    <div className={classNames(s.feed__col, { [s.feed__col_done]: isDone })}>
      <h4 className={classNames(s.feed__caption, 'mb-2 text_type_main-medium')}>{title}:</h4>
      {list.map((column, index) => (
        <ul key={index} className={classNames(s.feed__list, 'text_type_digits-default')}>
          {column.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ))}
    </div>
  )
}
