import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import RecoveryForm from '../../components/Form/RecoveryForm';
import s from './LoginPage.module.scss';

export default function ResetPasswordPage() {
  return (
    <main>
      <section className={classNames(s.login, 'pt-10 pb-10 text text_type_main-default')}>
        <div className={s.container}>
          <div className={s.login__container}>
            <h1 className={classNames(s.login__title, 'mb-6 text_type_main-medium')}>Сброс пароля</h1>
            <div className={s.login__wrap}>
              <RecoveryForm />
              <div className={s.login__bottom}>
                <div className={s.login__link}>
                  <span className='text_color_inactive'>Вспомнили пароль?</span>
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
  );
}
