import React from 'react';
import classNames from 'classnames';

import FeedCards from '../../components/FeedCards';
import FeedWrap from '../../components/FeedWrap';

import s from './FeedPage.module.scss';

export default function FeedPage() {
  return (
    <main>
      <section className={classNames(s.feed, 'pt-10 pb-10')}>
        <div className={s.container}>
          <div className={s.feed__container}>
            <h1 className='mb-5 text text_type_main-large'>Лента заказов</h1>
            <div className={s.feed__wrap}>
              <FeedCards />
              <FeedWrap />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
