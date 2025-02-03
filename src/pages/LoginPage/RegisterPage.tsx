import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import RegisterForm from '../../components/Form/RegisterForm';

import s from './LoginPage.module.scss';

export default function RegisterPage() {
  return (
    <main>
      <section className={classNames(s.login, 'pt-10 pb-10')}>
        <div className={s.container}>
          <div className={s.login__container}>
            <h1 className={classNames(s.login__title, 'mb-6 text text_type_main-medium')}>Регистрация</h1>
            <div className={s.login__wrap}>
              <RegisterForm />
              <div className={s.login__bottom}>
                <div className={s.login__link}>
                  <span className='text text_type_main-default text_color_inactive'>Уже зарегистрированы?</span>
                  <Link to={`/login`}>
                    <Button htmlType="button" type="secondary" size="medium">
                      Войти
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
