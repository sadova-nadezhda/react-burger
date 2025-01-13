import React, { useRef, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import IngredientsCard from './parts/IngredientsCard';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';

import { useModal } from '../../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { fetchIngredients } from '../../services/ingredients/actions'; 
import { setCurrentIngredient, clearCurrentIngredient } from '../../services/ingredients/slice'; 
import { setCurrentTab } from '../../services/tabs/slice';
import { Ingredient } from '../../types/IngredientTypes'; 

import s from './BurgerIngredients.module.scss';

export default function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);
  const selectedIngredient = useAppSelector((state) => state.ingredients.currentIngredient);
  const currentTab = useAppSelector((state) => state.tabs.currentTab);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  const { isModalOpen, openModal, closeModal } = useModal<Ingredient>();

  const bunRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (value: string) => {
    dispatch(setCurrentTab(value));
    if (value === 'bun' && bunRef.current) {
      bunRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (value === 'sauce' && sauceRef.current) {
      sauceRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (value === 'main' && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
    
      const bunTop = bunRef.current?.getBoundingClientRect().top || 0;
      const sauceTop = sauceRef.current?.getBoundingClientRect().top || 0;
      const mainTop = mainRef.current?.getBoundingClientRect().top || 0;
      const containerTop = container.getBoundingClientRect().top;
    
      const offsets = {
        bun: Math.abs(bunTop - containerTop),
        sauce: Math.abs(sauceTop - containerTop),
        main: Math.abs(mainTop - containerTop),
      };
    
      const closest = Object.entries(offsets).reduce((a, b) => (a[1] < b[1] ? a : b))[0];
      
      // Обновляем состояние вкладки через Redux
      if (closest !== currentTab) {
        dispatch(setCurrentTab(closest));  
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentTab, dispatch]);
  

  const handleIngredientClick = (ingredient: Ingredient) => {
    dispatch(setCurrentIngredient(ingredient));
    openModal(ingredient);
  };

  return (
    <>
      {isModalOpen && selectedIngredient && (
        <Modal onClose={() => { closeModal(); dispatch(clearCurrentIngredient()); }} title='Детали ингредиента'>
          <IngredientDetails />
        </Modal>
      )}
      <div className={s.ingredients__wrap}>
        <nav className={classNames(s.ingredients__nav, 'mb-10')}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={() => handleTabClick('bun')}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => handleTabClick('sauce')}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={() => handleTabClick('main')}>
            Начинки
          </Tab>
        </nav>
        <div className={classNames(s.ingredients__articles, 'custom-scroll')} ref={containerRef}>
          <article id='bun' ref={bunRef}>
            <h2 className='mb-6 text text_type_main-medium'>Булки</h2>
            <div className={s.cards}>
              {ingredients.filter((element) => element.type === 'bun').map((element) => (
                <IngredientsCard
                  key={element._id}
                  img={element.image}
                  name={element.name}
                  price={element.price}
                  onClick={() => handleIngredientClick(element)}
                />
              ))}
            </div>
          </article>
          <article id='sauce' ref={sauceRef}>
            <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
            <div className={s.cards}>
              {ingredients.filter((element) => element.type === 'sauce').map((element) => (
                <IngredientsCard
                  key={element._id}
                  img={element.image}
                  name={element.name}
                  price={element.price}
                  onClick={() => handleIngredientClick(element)}
                />
              ))}
            </div>
          </article>
          <article id='main' ref={mainRef}>
            <h2 className='mb-6 text text_type_main-medium'>Начинки</h2>
            <div className={s.cards}>
              {ingredients.filter((element) => element.type === 'main').map((element) => (
                <IngredientsCard
                  key={element._id}
                  img={element.image}
                  name={element.name}
                  price={element.price}
                  onClick={() => handleIngredientClick(element)}
                />
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}