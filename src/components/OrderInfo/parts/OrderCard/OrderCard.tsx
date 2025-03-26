import classNames from 'classnames';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './OrderCard.module.scss';

interface OrderCardProps {
  ingredient: {
    _id: string;
    name: string;
    image: string;
    price: number;
  };
  count?: number;
}

export default function OrderCard( { ingredient, count = 1 }: OrderCardProps) {
  return (
    <div className={s.card}>
      <div className={s.card__img}><img src={ingredient.image} alt="" /></div>
      <h4 className={s.card__caption}>{ingredient.name}</h4>
      <div className={classNames(s.card__price, 'text_type_digits-default')}>
        {count} x {ingredient.price}
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}
