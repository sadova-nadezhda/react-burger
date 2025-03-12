import React from 'react';
import classNames from 'classnames';

import s from './FeedCard.module.scss';

interface FeedCardProps {
  title: string;
  value: number;
}

export default function FeedCard({ title, value }: FeedCardProps) {
  return (
    <div className={classNames(s.feed__card, 'mb-15')}>
    <h4 className={classNames(s.feed__caption, 'text_type_main-medium')}>{title}:</h4>
    <div className={classNames(s.feed__number, 'text_type_digits-large')}>{value}</div>
  </div>
  )
}
