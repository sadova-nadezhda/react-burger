import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { forgotPassword } from '../../services/auth/actions';
import { useForm } from '../../hooks/useForm';

import s from './Form.module.scss';

export default function ForgotForm() {
  const { values, handleChange } = useForm({ email: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(values.email, navigate));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <EmailInput
        onChange={handleChange}
        value={values.email}
        name="email"
        isIcon={false}
        placeholder="Укажите e-mail"
        autoComplete="email"
      />
      {error && <p className={s.error_message}>{error}</p>}
      <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
        {loading ? 'Загрузка...' : 'Восстановить'}
      </Button>
    </form>
  );
}