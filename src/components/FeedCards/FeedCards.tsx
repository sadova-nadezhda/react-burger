import React from 'react';
import FeedCard from './parts/FeedCard';

import s from './FeedCards.module.scss';

export default function FeedCards() {
  return (
    <div className={s.cards}>
      <FeedCard
        orderNumber="034535"
        title="Death Star Starship Main бургер"
        price={480}
        ingredients={[
          "https://code.s3.yandex.net/react/code/sauce-02.png",
          "https://code.s3.yandex.net/react/code/sauce-02.png",
          "https://code.s3.yandex.net/react/code/sauce-02.png",
          "https://code.s3.yandex.net/react/code/sauce-02.png",
          "https://code.s3.yandex.net/react/code/sauce-02.png",
        ]}
      />
    </div>
  )
}
