import React, { useState, useEffect } from "react";

import AppHeader from '../AppHeader';
import BurgerIngredients from '../BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor';

import '../../styles/main.scss';

const url = 'https://norma.nomoreparties.space/api/ingredients';


function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
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
        <section className='constructor pt-10 pb-10'>
          <div className="container">
            <div className="constructor__container">
              <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
              <div className="constructor__wrap">
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
