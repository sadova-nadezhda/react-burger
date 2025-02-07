import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import ProfileForm from '../../components/Form/ProfileForm';
import { logoutUser } from '../../services/auth/actions';
import { useAppDispatch } from '../../hooks/store';

import s from './ProfilePage.module.scss';

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login'); // Переход после выхода
  };

  return (
    <main>
      <section className={classNames(s.profile, 'pt-30 pb-30 text text_type_main-default')}>
        <div className={s.container}>
          <div className={s.profile__container}>
            <aside className={classNames(s.profile__aside)}>
              <ul className={classNames(s.profile__list, 'mb-20 text_type_main-medium text_color_inactive')}>
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => classNames({ [s.active]: isActive })}
                    end
                  >
                    Профиль
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile/orders"
                    className={({ isActive }) => classNames({ [s.active]: isActive })}
                  >
                    История заказов
                  </NavLink>
                </li>
                <li onClick={handleLogout} className={s.logout}>Выход</li>
              </ul>
              <div className={classNames(s.profile__txt, 'mb-20 text_color_inactive')}>
                В этом разделе вы можете <br /> изменить свои персональные данные
              </div>
            </aside>
            <div className={s.profile__content}>
              <Outlet /> 
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
