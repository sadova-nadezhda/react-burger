import React, { useRef, useState, useEffect } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import IngredientsCard from './parts/IngredientsCard';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';
import { useModal } from '../../hooks/useModal';

import s from './BurgerIngredients.module.scss';

import { Ingredient } from '../../utils/types';

interface BurgerIngredientsProps {
  data: Ingredient[];
}

export default function BurgerIngredients({ data }: BurgerIngredientsProps) {
  const [current, setCurrent] = useState('bun');
  const { isModalOpen, selectedItem, openModal, closeModal } = useModal<Ingredient>();

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const containerRef = useRef(null);

  const handleTabClick = (value: string) => {
    setCurrent(value);
    if (value === 'bun' && bunRef.current) {
      bunRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (value === 'sauce' && sauceRef.current) {
      sauceRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (value === 'main' && mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    setCurrent(closest);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <>
      {isModalOpen && selectedItem && (
        <Modal onClose={closeModal} title='Детали ингредиента'>
          <IngredientDetails data={selectedItem} />
        </Modal>
      )}
      <div className={s.ingredients__wrap}>
        <nav className={classNames(s.ingredients__nav, 'mb-10')}>
          <Tab value="bun" active={current === 'bun'} onClick={() => handleTabClick('bun')}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={() => handleTabClick('sauce')}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={() => handleTabClick('main')}>
            Начинки
          </Tab>
        </nav>
        <div className={classNames(s.ingredients__articles, 'custom-scroll')} ref={containerRef}>
          <article id='bun' ref={bunRef}>
            <h2 className='mb-6 text text_type_main-medium'>Булки</h2>
            <div className={s.cards}>
              {data.filter((element) => element.type === 'bun').map((element) => (
                <IngredientsCard
                  key={element._id}
                  img={element.image}
                  name={element.name}
                  price={element.price}
                  onClick={() => openModal(element)}
                />
              ))}
            </div>
          </article>
          <article id='sauce' ref={sauceRef}>
            <h2 className='mb-6 text text_type_main-medium'>Соусы</h2>
            <div className={s.cards}>
              {data.filter((element) => element.type === 'sauce').map((element) => (
                <IngredientsCard
                  key={element._id}
                  img={element.image}
                  name={element.name}
                  price={element.price}
                  onClick={() => openModal(element)}
                />
              ))}
            </div>
          </article>
          <article id='main' ref={mainRef}>
            <h2 className='mb-6 text text_type_main-medium'>Начинки</h2>
            <div className={s.cards}>
              {data.filter((element) => element.type === 'main').map((element) => (
                <IngredientsCard
                  key={element._id}
                  img={element.image}
                  name={element.name}
                  price={element.price}
                  onClick={() => openModal(element)}
                />
              ))}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
