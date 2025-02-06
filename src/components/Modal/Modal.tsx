import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

import ModalOverlay from '../ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './Modal.module.scss';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById('modals');

export default function Modal({ title, onClose, children }: ModalProps) {
  const location = useLocation();

  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  useEffect(() => {
    if (!location.state?.background) {
      onClose();
    }
  }, [location, onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose}>
      <div className={classNames(s.modal, 'p-10')} onClick={(e) => e.stopPropagation()}>
        <div className={s.modal__content}>
          <button className={s.modal__close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
          {title && <h2 className={classNames(s.modal__title, 'mb-5 text text_type_main-large')}>{title}</h2>}
          <div className={classNames(s.modal__body, 'text text_type_main-default')}>{children}</div>
        </div>
      </div>
    </ModalOverlay>,
    modalRoot!
  );
}
