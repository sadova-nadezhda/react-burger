import React from 'react';
import FeedCard from './parts/FeedCard';

import s from './FeedCards.module.scss';

export default function FeedCards() {
  return (
    <div className={s.cards}>
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
      <FeedCard />
    </div>
  )
}
