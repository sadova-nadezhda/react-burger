import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import LoginForm from '../../components/Form/LoginForm';

import s from './LoginPage.module.scss';

export default function LoginPage() {
  return (
    <main>
      <section className={classNames(s.login, 'pt-10 pb-10')}>
        <div className={s.container}>
          <div className={s.login__container}>
            <h1 className={classNames(s.login__title, 'mb-6 text text_type_main-medium')}>Вход</h1>
            <div className={s.login__wrap}>
              <LoginForm />
              <div className={s.login__bottom}>
                <div className={s.login__link}>
                  <span className='text text_type_main-default text_color_inactive'>Вы — новый пользователь?</span>
                  <Link to={`/register`}>
                    <Button htmlType="button" type="secondary" size="medium">
                      Зарегистрироваться
                    </Button>
                  </Link>
                </div>
                <div className={s.login__link}>
                  <span className='text text_type_main-default text_color_inactive'>Забыли пароль?</span>
                  <Link to={`/forgot-password `}>
                    <Button htmlType="button" type="secondary" size="medium">
                      Восстановить пароль
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
