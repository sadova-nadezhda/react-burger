import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; 
import classNames from 'classnames';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './AppHeader.module.scss';

interface NavItemProps {
  id: number;
  IconComponent: React.ElementType;
  label: string;
  activeId: number;
  setActiveId: React.Dispatch<React.SetStateAction<number>>;
  to: string;
  onClick?: () => void;
}

const NavItem = ({ id, IconComponent, label, activeId, setActiveId, to, onClick }: NavItemProps) => (
  <li
    id={id.toString()}
    className={classNames(s.header__item, { [s.active]: activeId === id }, 'p-5')}
    onClick={() => {
      setActiveId(id);
      if (onClick) onClick();
    }}
  >
    <Link to={to}>
      <IconComponent type={activeId === id ? 'primary' : 'secondary'} />
      {label}
    </Link>
  </li>
);

function AppHeader() {
  const [activeId, setActiveId] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/reset-password' || location.pathname === '/profile') {
      setActiveId(4);
    } else if (location.pathname === '/') {
      setActiveId(1);
    } else if (location.pathname === '/orders') {
      setActiveId(2);
    }
  }, [location]);


  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login'); 
    }
  };

  return (
    <header className={classNames(s.header, 'text', 'text_type_main-default')}>
      <div className={s.container}>
        <nav className={classNames(s.header__container, 'pb-4', 'pt-4')}>
          <ul className={s.header__menu}>
            <NavItem id={1} IconComponent={BurgerIcon} label="Конструктор" activeId={activeId} setActiveId={setActiveId} to="/" />
            <NavItem id={2} IconComponent={ListIcon} label="Лента заказов" activeId={activeId} setActiveId={setActiveId} to="/orders" />
            <li id="3" className={s.header__logo}>
              <Logo />
            </li>
            <NavItem 
              id={4} 
              IconComponent={ProfileIcon} 
              label="Личный кабинет" 
              activeId={activeId} 
              setActiveId={setActiveId} 
              to={isAuthenticated ? "/profile" : "/login"} 
              onClick={handleProfileClick} 
            />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
