import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <main>
      <section className={classNames(s.error, 'pt-10 pb-10 text text_type_main-default')}>
        <div className={s.container}>
          <div className={s.error__container}>
            <h1 className={classNames(s.error__title, 'mb-10 text_type_main-large')}>Page Not Found</h1>
            <Link to={`/`}>
              <Button htmlType="button" type="primary" size="medium">
                Вернуться на главную
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
