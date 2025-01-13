import React, { useState } from 'react';
import classNames from 'classnames';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './AppHeader.module.scss';

interface NavItemProps {
  id: number;
  IconComponent: React.ElementType;
  label: string;
  activeId: number;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
}

const NavItem = ({ id, IconComponent, label, activeId, setActiveId } : NavItemProps) => (
  <li
    id={id.toString()}
    className={classNames(s.header__item, { [s.active]: activeId === id }, 'p-5')}
    onClick={() => setActiveId(id)}
  >
    <IconComponent type={activeId === id ? 'primary' : 'secondary'} />
    {label}
  </li>
);

function AppHeader() {
  const [activeId, setActiveId] = useState(1);

  return (
    <header className={classNames(s.header, 'text', 'text_type_main-default')}>
      <div className={s.container}>
        <nav className={classNames(s.header__container, 'pb-4', 'pt-4')}>
          <ul className={s.header__menu}>
            <NavItem id={1} IconComponent={BurgerIcon} label="Конструктор" activeId={activeId} setActiveId={setActiveId} />
            <NavItem id={2} IconComponent={ListIcon} label="Лента заказов" activeId={activeId} setActiveId={setActiveId} />
            <li id="3" className={s.header__logo}>
              <Logo />
            </li>
            <NavItem id={4} IconComponent={ProfileIcon} label="Личный кабинет" activeId={activeId} setActiveId={setActiveId} />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
