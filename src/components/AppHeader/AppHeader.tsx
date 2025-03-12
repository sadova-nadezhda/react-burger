import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const NavItem = ({ id, IconComponent, label, activeId, setActiveId, to }: NavItemProps) => (
  <li
    className={classNames(s.header__item, { [s.active]: activeId === id }, 'p-5')}
    onClick={() => setActiveId(id)}
  >
    <Link to={to} className={s.header__link}>
      <IconComponent type={activeId === id ? 'primary' : 'secondary'} />
      <span>{label}</span>
    </Link>
  </li>
);

function AppHeader() {
  const [activeId, setActiveId] = useState(1);
  const isAuthenticated = useAppSelector((state) => !!state.auth.user);
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setActiveId(1);
        break;
      case '/feed':
      case '/feed/:id':
        setActiveId(2);
        break;
      case '/login':
      case '/register':
      case '/forgot-password':
      case '/reset-password':
        setActiveId(4);
        break;
      case '/profile':
      case '/profile/orders':
      case '/profile/orders/:id':
        setActiveId(4);
        break;
      default:
        setActiveId(1);
        break;
    }
  }, [location.pathname]);

  return (
    <header className={classNames(s.header, 'text', 'text_type_main-default')}>
      <div className={s.container}>
        <nav className={classNames(s.header__container, 'pb-4', 'pt-4')}>
          <ul className={s.header__menu}>
            <NavItem
              id={1}
              IconComponent={BurgerIcon}
              label="Конструктор"
              activeId={activeId}
              setActiveId={setActiveId}
              to="/"
            />
            <NavItem
              id={2}
              IconComponent={ListIcon}
              label="Лента заказов"
              activeId={activeId}
              setActiveId={setActiveId}
              to="/feed"
            />
            <li className={s.header__logo}>
              <Link to="/" className={s.header__link}>
                <Logo />
              </Link>
            </li>
            <NavItem
              id={4}
              IconComponent={ProfileIcon}
              label="Личный кабинет"
              activeId={activeId}
              setActiveId={setActiveId}
              to={isAuthenticated ? '/profile' : '/login'}
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;