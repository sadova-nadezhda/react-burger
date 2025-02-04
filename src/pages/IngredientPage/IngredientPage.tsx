import React from 'react';
import classNames from 'classnames';
import IngredientDetails from '../../components/IngredientDetails';

import s from './IngredientPage.module.scss';

export default function IngredientPage() {
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
