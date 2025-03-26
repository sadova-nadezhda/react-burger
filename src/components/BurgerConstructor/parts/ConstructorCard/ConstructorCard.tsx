import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import { Ingredient } from '../../../../types/IngredientTypes';

import s from './ConstructorCard.module.scss';

interface ConstructorCardTypes {
  ingredient: Ingredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  handleClose: () => void;
}

export default function ConstructorCard({
  ingredient,
  index,
  moveIngredient,
  handleClose,
}: ConstructorCardTypes) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'constructor-ingredient',
    hover: (item: { index: number }) => {
      if (!ref.current) return;
  
      const dragIndex = item.index;
      const hoverIndex = index;
  
      if (dragIndex === hoverIndex) return;
  
      moveIngredient(dragIndex, hoverIndex);
      
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={s.constructor__card}
      style={{ opacity: isDragging ? 0.5 : 1 }} 
      data-test="constructor-item"
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
      />
    </div>
  );
}
