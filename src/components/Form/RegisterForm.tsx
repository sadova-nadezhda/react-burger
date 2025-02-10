import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../services/auth/actions';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useForm } from '../../hooks/useForm';

import s from './Form.module.scss';

export default function RegisterForm() {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser(values.email, values.password, values.name));

    if (result?.success) {
      navigate('/profile');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <Input type="text" placeholder="Имя" onChange={handleChange} value={values.name} name="name" />
      <EmailInput onChange={handleChange} value={values.email} name="email" />
      <PasswordInput onChange={handleChange} value={values.password} name="password" autoComplete="new-password" />
      {error && <p className={s.error_message}>{error}</p>}
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
    </form>
  );
}