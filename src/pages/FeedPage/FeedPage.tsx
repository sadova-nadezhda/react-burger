import React from 'react';
import classNames from 'classnames';

import s from './FeedPage.module.scss';
import FeedCards from '../../components/FeedCards';

export default function FeedPage() {
  return (
    <main>
      <section className={classNames(s.feed, 'pt-10 pb-10')}>
        <div className={s.container}>
          <div className={s.feed__container}>
            <h1 className='mb-5 text text_type_main-large'>Лента заказов</h1>
            <div className={s.feed__wrap}>
              <FeedCards />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
