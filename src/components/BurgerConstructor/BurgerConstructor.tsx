import { useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import ConstructorCard from './parts/ConstructorCard';
import OrderDetails from '../OrderDetails';
import Modal from '../Modal';

import { useOrderModal } from '../../hooks/useOrderModal';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { addIngredientToConstructor, removeIngredientFromConstructor, reorderIngredients } from '../../services/burger-constructor/slice';
import { incrementIngredientCount, decrementIngredientCount } from '../../services/ingredients/slice';

import { Ingredient } from '../../types/IngredientTypes';

import s from './BurgerConstructor.module.scss';

export default function BurgerConstructor() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const ingredients = useAppSelector((state) => state.burgerConstructor.constructorIngredients);
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const { isModalOpen, openModal, closeModal } = useOrderModal();

  const [{ isOver }, dropRef] = useDrop<Ingredient, void, { isOver: boolean }>({
    accept: ['bun', 'ingredient'],
    drop: (ingredient) => {
      if (ingredient.type === 'bun') {
        const existingBun = ingredients.find((item) => item.type === 'bun');
        if (existingBun) {
          dispatch(decrementIngredientCount({ id: existingBun._id, amount: 2 }));
          dispatch(removeIngredientFromConstructor(existingBun._id));
        }
        dispatch(addIngredientToConstructor(ingredient));
        dispatch(incrementIngredientCount({ id: ingredient._id, amount: 2 }));
      } else {
        console.log('Dropped ingredient:', ingredient);
        console.log('Current state:', ingredients);
        dispatch(addIngredientToConstructor(ingredient));
        dispatch(incrementIngredientCount({ id: ingredient._id, amount: 1 }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const bunIngredient = ingredients.find((ingredient) => ingredient.type === 'bun');
  const mainIngredients = ingredients.filter((ingredient) => ingredient.type !== 'bun');

  const handleRemove = (ingredient: Ingredient) => {
    dispatch(removeIngredientFromConstructor(ingredient.uuid));
    const amount = ingredient.type === 'bun' ? 2 : 1;
    dispatch(decrementIngredientCount({ id: ingredient._id, amount }));
  };

  const handleReorder = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedMainIngredients = [...mainIngredients];
      const [draggedItem] = updatedMainIngredients.splice(dragIndex, 1);
      updatedMainIngredients.splice(hoverIndex, 0, draggedItem);

      const updatedIngredients = [
        ...updatedMainIngredients,
        bunIngredient ? { ...bunIngredient, type: 'bun' } : null,
      ].filter(Boolean) as Ingredient[];

      dispatch(reorderIngredients(updatedIngredients));
    },
    [dispatch, mainIngredients, bunIngredient]
  );

  const total = useMemo(() => {
    const bunPrice: number = bunIngredient?.price ?? 0;
    const mainIngredientsPrice: number = mainIngredients.reduce((sum, ingredient) => sum + (ingredient.price ?? 0), 0);
    return bunPrice * 2 + mainIngredientsPrice;
  }, [bunIngredient, mainIngredients]);

  return (
    <>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <OrderDetails ingredients={ingredients.map((item) => item._id)} />
        </Modal>
      )}
      <div className={classNames(s.constructor__wrap, 'pb-10')} >
        <div className={classNames(s.constructor__cards, 'mb-10', { [s.over]: isOver })} ref={dropRef} data-test="constructor">
          <div className={s.constructor__top}>
            {!bunIngredient ? (
              <div className={s.constructor__card}>
                <p className={classNames(s.constructor__tmp, 'text_type_main-default constructor-element')}>Выберите булку</p>
              </div>
            ) : (
              <div className={s.constructor__card} data-test="constructor-bun">
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
            {mainIngredients.length === 0 ? (
              <div className={s.constructor__card}>
                <p className={classNames(s.constructor__tmp, 'text_type_main-default constructor-element')}>Добавьте ингредиенты</p>
              </div>
            ) : (
              mainIngredients.map((ingredient, index) => (
                <ConstructorCard
                  key={ingredient.uuid}
                  ingredient={ingredient}
                  index={index}
                  moveIngredient={handleReorder}
                  handleClose={() => handleRemove(ingredient)}
                />
              ))
            )}
          </div>
          <div className={s.constructor__bottom}>
            {!bunIngredient ? (
              <div className={s.constructor__card}>
                <p className={classNames(s.constructor__tmp, 'text_type_main-default constructor-element')}>Выберите булку</p>
              </div>
            ) : (
              <div className={s.constructor__card} data-test="constructor-bun">
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
          <div className={classNames(s.constructor__price, 'text text_type_digits-medium')}>
            {total}
            <CurrencyIcon type="primary" />
          </div>
          <Button 
            htmlType="button" 
            type="primary" 
            size="medium" 
            data-test="order-button"
            onClick={isAuthenticated ? openModal : () => navigate('/login', { state: { from: location.pathname } })}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
}
