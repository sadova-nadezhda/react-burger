import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../hooks/store';

import s from './AppHeader.module.scss';

interface NavItemProps {
  id: number;
  IconComponent: React.ElementType;
  label: string;
  activeId: number;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
  to: string;
}

const NavItem = ({ id, IconComponent, label, to }: Omit<NavItemProps, 'activeId' | 'setActiveId'>) => (
  <li className={classNames(s.header__item, 'p-5')}>
    <NavLink
      to={to}
      className={({ isActive }) => classNames(s.header__item, { [s.active]: isActive }, s.header__link)}
    >
      {({ isActive }) => (
        <>
          <IconComponent type={isActive ? 'primary' : 'secondary'} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  </li>
);

function AppHeader() {
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);

  return (
    <header className={classNames(s.header, 'text', 'text_type_main-default')}>
      <div className={s.container}>
        <nav className={classNames(s.header__container, 'pb-4', 'pt-4')}>
          <ul className={s.header__menu}>
            <NavItem id={1} IconComponent={BurgerIcon} label="Конструктор" to="/" />
            <NavItem id={2} IconComponent={ListIcon} label="Лента заказов" to="/feed" />
            <li className={s.header__logo}>
              <NavLink to="/" className={s.header__link}>
                <Logo />
              </NavLink>
            </li>
            <NavItem id={4} IconComponent={ProfileIcon} label="Личный кабинет" to={isAuthenticated ? '/profile' : '/login'} />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;