import React from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import classNames from 'classnames';

import BurgerIngredients from '../../components/BurgerIngredients';
import BurgerConstructor from '../../components/BurgerConstructor';

import s from './ConstructorPage.module.scss';

function ConstructorPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <main>
        <section className={classNames(s.constructor, 'pt-10 pb-10')}>
          <div className={s.container}>
            <div className={s.constructor__container}>
              <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
              <div className={s.constructor__wrap}>
                <BurgerIngredients />
                <BurgerConstructor />
              </div>
            </div>
          </div>
        </section>
      </main>
    </DndProvider>
  );
}

export default ConstructorPage;