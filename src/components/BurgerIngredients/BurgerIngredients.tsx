import React, { useRef, useEffect, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

import IngredientsCard from './parts/IngredientsCard';
import { Ingredient } from '../../types/IngredientTypes';

import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { setCurrentTab } from '../../services/tabs/slice';
import { useModal } from '../../hooks/useModal';

import s from './BurgerIngredients.module.scss';

export default function BurgerIngredients() {
  const dispatch = useAppDispatch();
  const { openModal } = useModal();
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);
  const currentTab = useAppSelector((state) => state.tabs.currentTab);

  const bunRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTabClick = useCallback(
    (value: string) => {
      dispatch(setCurrentTab(value));
      const targetRef = { bun: bunRef, sauce: sauceRef, main: mainRef }[value]?.current;
      targetRef?.scrollIntoView({ behavior: 'smooth' });
    },
    [dispatch]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerTop = containerRef.current.getBoundingClientRect().top;
      const sections = [
        { key: 'bun', ref: bunRef },
        { key: 'sauce', ref: sauceRef },
        { key: 'main', ref: mainRef },
      ];

      const closestTab = sections.reduce(
        (closest, section) => {
          const offset = Math.abs((section.ref.current?.getBoundingClientRect().top || 0) - containerTop);
          return offset < closest.offset ? { key: section.key, offset } : closest;
        },
        { key: '', offset: Infinity }
      ).key;

      if (closestTab !== currentTab) {
        dispatch(setCurrentTab(closestTab));
      }
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [currentTab, dispatch]);

  const handleIngredientClick = (ingredient: Ingredient) => {
    openModal(ingredient);
  };  

  const ingredientTypes = [
    { id: 'bun', title: 'Булки' },
    { id: 'sauce', title: 'Соусы' },
    { id: 'main', title: 'Начинки' },
  ];

  const renderIngredientSection = (
    id: string,
    title: string,
    ref: React.RefObject<HTMLElement>
  ) => (
    <article id={id} ref={ref} key={id}>
      <h2 className="mb-6 text text_type_main-medium">{title}</h2>
      <div className={s.cards}>
        {ingredients
          .filter((ingredient) => ingredient.type === id)
          .map((ingredient) => (
            <IngredientsCard
              key={ingredient._id}
              ingredient={ingredient}
              onClick={() => handleIngredientClick(ingredient)}
            />
          ))}
      </div>
    </article>
  );

  return (
    <>
      <div className={s.ingredients__wrap}>
          <nav className={classNames(s.ingredients__nav, 'mb-10')}>
            {['bun', 'sauce', 'main'].map((tab) => (
              <Tab
                key={tab}
                value={tab}
                active={currentTab === tab}
                onClick={() => handleTabClick(tab)}
              >
                {tab === 'bun' ? 'Булки' : tab === 'sauce' ? 'Соусы' : 'Начинки'}
              </Tab>
            ))}
          </nav>
          <div className={classNames(s.ingredients__articles, 'custom-scroll')} ref={containerRef}>
            {ingredientTypes.map(({ id, title }) =>
              renderIngredientSection(
                id,
                title,
                id === 'bun' ? bunRef : id === 'sauce' ? sauceRef : mainRef
              )
            )}
          </div>
      </div>
    </>
  );
}