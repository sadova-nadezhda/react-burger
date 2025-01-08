import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './ConstructorCard.module.scss';

interface ConstructorCardProps {
  name: string,
  price: number,
  img: string
}

export default function ConstructorCard({name, price, img}:ConstructorCardProps) {
  return (
  <div className={s.constructor__card}>
    <DragIcon type="primary" />
    <ConstructorElement text={name} price={price} thumbnail={img} />
  </div>
  )
}
