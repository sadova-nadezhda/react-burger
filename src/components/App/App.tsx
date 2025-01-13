import React, { useState, useEffect } from "react";
import classNames from 'classnames';

import AppHeader from '../AppHeader';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';

import s from  './App.module.scss';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const fetchIngredients = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data?.data) {
          setIngredients(data.data);
        } else {
          throw new Error("Неверный формат данных");
        }
      } catch (error) {
        console.error("Ошибка при загрузке ингредиентов:", error.message);
        setIngredients([]);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <>
      <AppHeader />
      <main>
        <section className={classNames(s.constructor,'pt-10 pb-10')}>
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
  )
}

export default App;
