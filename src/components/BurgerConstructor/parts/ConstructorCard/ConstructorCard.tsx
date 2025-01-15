import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { Ingredient } from '../../../../types/IngredientTypes';

import s from './ConstructorCard.module.scss';

interface ConstructorCardProps {
  ingredient: Ingredient[],
  handleClose: () => void;
}

export default function ConstructorCard({ingredient, handleClose}:ConstructorCardProps) {
  return (
  <div className={s.constructor__card}>
    <DragIcon type="primary" />
    <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image} handleClose={handleClose} />
  </div>
  )
}
