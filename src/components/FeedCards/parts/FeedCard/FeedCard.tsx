import React, { useMemo } from 'react';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './FeedCard.module.scss';
import classNames from 'classnames';

interface FeedCardProps {
  orderNumber: string;
  title: string;
  price: number;
  images: string[];
  onClick: () => void;
}

export default function FeedCard({ orderNumber, title, price, images, onClick }: FeedCardProps) {
  const formattedDate = useMemo(() => {
    const now = new Date();
    return new Date(now.setMinutes(now.getMinutes() - 1));
  }, []);

  const MAX_IMAGES = 6;
  const displayedImages = images.slice(0, MAX_IMAGES);
  const remainingCount = images.length - MAX_IMAGES;

  return (
    <div className={classNames(s.card, 'text text_type_main-default')} onClick={onClick}>
      <div className={`${s.card__top} ${s.card__row}`}>
        <div className={classNames(s.card__order, 'text_type_digits-default')}>#{orderNumber}</div>
        <div className={classNames(s.card__datetime, 'text_color_inactive')}>
          <FormattedDate date={formattedDate} />
        </div>
      </div>
      <h4 className={classNames(s.card__caption, 'text_type_main-medium')}>Заказ №{title}</h4>
      <div className={`${s.card__bottom} ${s.card__row}`}>
        <div className={s.card__ingredients}>
          {displayedImages.map((src, index) => (
            <div key={index} className={s.card__item}>
              <img src={src} alt="ingredient" />
            </div>
          ))}
          {remainingCount > 0 && (
            <span className={s.card__more}>+{remainingCount}</span>
          )}
        </div>
        <div className={`${s.card__total} ${s.card__row} text_type_digits-default`}>
          {price} <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
