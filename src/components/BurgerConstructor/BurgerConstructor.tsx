import React from 'react';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import ConstructorCard from './parts/ConstructorCard';
import OrderDetails from '../OrderDetails';
import Modal from '../Modal';
import { useModal } from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { addIngredientToConstructor, removeIngredientFromConstructor } from '../../services/burger-constructor/slice';

import s from './BurgerConstructor.module.scss';

export default function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.burgerConstructor.constructorIngredients);
  const total = 10000;
  const { isModalOpen, openModal, closeModal } = useModal<null>();

  const [{ isOver }, dropRef] = useDrop({
    accept: ['bun', 'ingredient'],
    drop: (item) => dispatch(addIngredientToConstructor(item)),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const bunIngredient = ingredients.find((ingredient) => ingredient.type === 'bun');
  const mainIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');

  return (
    <>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      <div className={classNames(s.constructor__wrap, 'pb-10')}>
        <div className={classNames(s.constructor__cards, 'mb-10', { [s.over]: isOver })}  ref={dropRef}>
          <div className={s.constructor__top}>
            {bunIngredient && (
              <div className={s.constructor__card}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${bunIngredient.name} (верх)`}
                  price={bunIngredient.price}
                  thumbnail={bunIngredient.image}
                />
              </div>
            )}
          </div>
          <div className={classNames(s.constructor__main, 'custom-scroll')}>
            {mainIngredients.map((ingredient) => (
              <ConstructorCard 
              key={ingredient._id}
              ingredient={ingredient}
              handleClose={() => dispatch(removeIngredientFromConstructor(ingredient._id))}
              />
            ))}
          </div>
          <div className={s.constructor__bottom}>
            {bunIngredient && (
              <div className={s.constructor__card}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${bunIngredient.name} (низ)`}
                  price={bunIngredient.price}
                  thumbnail={bunIngredient.image}
                />
              </div>
            )}
          </div>
        </div>
        <div className={s.constructor__total}>
          <div className={classNames(s.constructor__price, "text text_type_digits-medium")}>
            {total}
            <CurrencyIcon type="primary" />
          </div>
          <Button htmlType="button" type="primary" size="medium" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  )
}
