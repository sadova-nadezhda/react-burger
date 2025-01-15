import React from 'react';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import { Ingredient } from '../../../../types/IngredientTypes';

import s from './IngredientsCard.module.scss';

interface IngredientsCard {
  ingredient: Ingredient[],
  onClick: () => void;
}

export default function IngredientsCard({ingredient, onClick}: IngredientsCard) {
  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient,
  });
  return (
    <div className={s.card} onClick={onClick} ref={dragRef}>
      <Counter count={0} size="default" extraClass="m-1" />
      <div className={classNames(s.card__img)}><img src={ingredient.image} alt="Ingredient Image" /></div>
      <div className={classNames(s.card__price, 'text text_type_digits-default')}>
        {ingredient.price}
        <CurrencyIcon type="primary" />
      </div>
      <h4 className={classNames(s.card__caption, 'text text_type_main-default')}>{ingredient.name}</h4>
    </div>
  )
}
