import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import AppHeader from '../AppHeader';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';

import { fetchIngredients } from '../../services/ingredients/actions'; 
import s from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.allIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <main>
        <section className={classNames(s.constructor, 'pt-10 pb-10')}>
          <div className={s.container}>
            <div className={s.constructor__container}>
              <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
              <div className={s.constructor__wrap}>
                <BurgerIngredients data={ingredients} />
                <BurgerConstructor data={ingredients} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
