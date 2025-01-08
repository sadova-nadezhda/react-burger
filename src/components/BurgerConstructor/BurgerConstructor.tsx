import React, { useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import ConstructorCard from './parts/ConstructorCard';
import OrderDetails from '../OrderDetails';

import s from './BurgerConstructor.module.scss';
import Modal from '../Modal';

const img = "https://code.s3.yandex.net/react/code/bun-02.png";

interface Ingredient {
  _id: string;
  type: string;
  image: string;
  name: string;
  price: number;
}

interface BurgerConstructorProps {
  data: Ingredient[];
}

export default function BurgerConstructor({data}:BurgerConstructorProps) {
  const total = 10000;
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      <div className={classNames(s.constructor__wrap, 'pb-10')}>
        <div className={classNames(s.constructor__cards, 'mb-10')}>
          <div className={s.constructor__top}>
            <div className={s.constructor__card}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={1255}
                thumbnail={img}
              />
            </div>
          </div>
          <div className={classNames(s.constructor__main, 'custom-scroll')}>
              {data.filter((element) => element.type!=='bun').map((element)=> (
                <ConstructorCard key={element._id} img={element.image} name={element.name} price={element.price} />
              ))}
          </div>
          <div className={s.constructor__bottom}>
            <div className={s.constructor__card}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={1255}
                thumbnail={img}
              />
            </div>
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
