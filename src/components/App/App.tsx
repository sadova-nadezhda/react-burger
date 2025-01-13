import React from "react";
import classNames from 'classnames';

import AppHeader from '../AppHeader';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';

import s from './App.module.scss';

function App() {
  return (
    <>
      <AppHeader />
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
    </>
  );
}

export default App;