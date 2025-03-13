import React, { useMemo } from 'react';
import classNames from 'classnames';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useAppSelector } from '../../../../hooks/store';

import s from './FeedCard.module.scss';

interface FeedCardProps {
  orderNumber: string;
  status: string;
  title: string;
  price: number;
  images: string[];
  onClick: () => void;
}

export default function FeedCard({ orderNumber, title, price, images, status, onClick }: FeedCardProps) {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);

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
      <div className={s.card__main}>
        <h4 className={classNames(s.card__caption, 'text_type_main-medium')}>Заказ №{title}</h4>
        { isAuthenticated ?
        ( <div className={classNames(s.card__status, 'mt-2')}>
          { status === 'done' ? 
          ( <span className={s.card__done}>Выполнен</span> ) 
          : status === 'created' ? 
          ( <span className={s.card__create}>Создан</span> )
          : ( <span className={s.card__prepare}>Готовится</span> )
          }
        </div> ) : false
        }
      </div>
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
