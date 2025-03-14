import React from 'react';
import classNames from 'classnames';

import FeedColumn from './parts/FeedColumn';
import FeedCard from './parts/FeedCard';

import s from './FeedWrap.module.scss';

interface FeedWrapProps {
  doneOrders: string[];
  inProgressOrders: string[];
  total: number;
  today: number;
}

export default function FeedWrap({ doneOrders, inProgressOrders, total, today }: FeedWrapProps) {
  return (
    <div className={classNames(s.feed, 'text text_type_main-default')}>
      <div className={classNames(s.feed__row, 'mb-15')}>
        <FeedColumn title="Готовы" items={doneOrders} isDone />
        <FeedColumn title="В работе" items={inProgressOrders} />
      </div>
      <FeedCard title="Выполнено за все время" value={total} />
      <FeedCard title="Выполнено за сегодня" value={today} />
    </div>
  )
}