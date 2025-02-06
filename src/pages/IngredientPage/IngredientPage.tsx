import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import IngredientDetails from '../../components/IngredientDetails';
import { fetchIngredients } from '../../services/ingredients/actions';

import s from './IngredientPage.module.scss';

export default function IngredientPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector((state) => state.ingredients.allIngredients);
  const ingredient = ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (!ingredient) {
    return <p className="text text_type_main-medium">Загрузка...</p>;
  }

  return (
    <main>
      <section className={classNames(s.details, 'pt-30 pb-30 text text_type_main-default')}>
        <div className={s.container}>
          <div className={s.details__container}>
            <h1 className={classNames(s.details__title, 'text_type_main-large')}>Детали ингредиента</h1>
            <IngredientDetails />
          </div>
        </div>
      </section>
    </main>
  )
}
