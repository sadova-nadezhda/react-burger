import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import s from './IngredientDetails.module.scss';

export default function IngredientDetails() {
  const selectedIngredient = useSelector((state) => state.ingredients.currentIngredient);

  if (!selectedIngredient) {
    return null; 
  }

  return (
    <div className={s.card}>
      <div className={classNames(s.card__img, "mb-4")}>
        <img src={selectedIngredient.image} alt="Ingredient Image" />
      </div>
      <h4 className={classNames(s.card__title, "mb-8 text_type_main-medium")}>
        {selectedIngredient.name}
      </h4>
      <div className={classNames(s.card__desc, "text_color_inactive")}>
        <div className='calories'>
          <span className='mb-2'>Калории, ккал</span>
          <span className='text_type_digits-default'>{selectedIngredient.calories}</span>
        </div>
        <div className='proteins'>
          <span className='mb-2'>Белки, г</span>
          <span className='text_type_digits-default'>{selectedIngredient.proteins}</span>
        </div>
        <div className='fat'>
          <span className='mb-2'>Жиры, г</span>
          <span className='text_type_digits-default'>{selectedIngredient.fat}</span>
        </div>
        <div className='carbohydrates'>
          <span className='mb-2'>Углеводы, г</span>
          <span className='text_type_digits-default'>{selectedIngredient.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}
