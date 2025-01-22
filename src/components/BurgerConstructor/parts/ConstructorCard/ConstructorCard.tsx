import React from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import { Ingredient } from '../../../../types/IngredientTypes';

import s from './ConstructorCard.module.scss';

interface ConstructorCardProps {
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
}: ConstructorCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  // Drag source
  const [{ isDragging }, drag] = useDrag({
    type: 'constructor-ingredient',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop target
  const [, drop] = useDrop({
    accept: 'constructor-ingredient',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveIngredient(item.index, index);
        item.index = index; // Update the index after moving
      }
    },
  });

  // Connect drag and drop
  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={s.constructor__card}
      style={{ opacity: isDragging ? 0.5 : 1 }} // Visual feedback while dragging
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
