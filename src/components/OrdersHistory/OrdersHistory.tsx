import React from 'react';
import classNames from 'classnames';
import FeedCards from '../FeedCards';

import s from './OrdersHistory.module.scss';

export default function OrdersHistory() {
  return (
    <div className={classNames(s.orders, 'text text_type_main-default')}>
      <FeedCards />
    </div>
  )
}
