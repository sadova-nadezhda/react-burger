import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import ModalOverlay from '../ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import s from './Modal.module.scss';

interface ModalProps {
  title?: string; // Заголовок стал необязательным
  onClose: () => void;
  children: React.ReactNode;
}

const modalRoot = document.getElementById('modals');

export default function Modal({ title, onClose, children } : ModalProps) {
  const handleEscClose = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose} >
      <div className={classNames(s.modal, 'p-10')}>
        <div className={s.modal__content}>
          <button className={s.modal__close} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
          {title && (
            <header className={classNames(s.modal__header, 'mb-5')}>
              <h2 className="text text_type_main-large">{title}</h2>
            </header>
          )}
          <div className={classNames(s.modal__body, 'text text_type_main-default')}>{children}</div>
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}
