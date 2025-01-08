import React from 'react';
import classNames from 'classnames';

import s from './IngredientDetails.module.scss';

interface Ingredient {
  image: string;
  name: string;
  calories: string;
  proteins: string;
  fat: string;
  carbohydrates: string;
}

interface IngredientDetails {
  data: Ingredient[];
}

export default function IngredientDetails({data}:IngredientDetails) {
  return (
    <div className={s.card}>
      <div className={classNames(s.card__img, "mb-4")}><img src={data.image} alt="" /></div>
      <h4 className={classNames(s.card__title, "mb-8 text_type_main-medium")}>{data.name}</h4>
      <div className={classNames(s.card__desc, "text_color_inactive")}>
        <div className='calories'>
          <span className='mb-2'>Калории,ккал</span>
          <span className='text_type_digits-default'>{data.calories}</span>
        </div>
        <div className='proteins'>
          <span className='mb-2'>Белки, г</span>
          <span className='text_type_digits-default'>{data.proteins}</span>
        </div>
        <div className='fat'>
          <span className='mb-2'>Жиры, г</span>
          <span className='text_type_digits-default'>{data.fat}</span>
        </div>
        <div className='carbohydrates'>
          <span className='mb-2'>Углеводы, г</span>
          <span className='text_type_digits-default'>{data.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}
