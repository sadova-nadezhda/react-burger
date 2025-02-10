import React, { FormEvent } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../services/auth/actions';
import { useAppDispatch } from '../../hooks/store';
import { useForm } from '../../hooks/useForm';

export default function RegisterForm() {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(values.email, values.password, values.name));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <Input type="text" placeholder="Имя" onChange={handleChange} value={values.name} name="name" />
      <EmailInput onChange={handleChange} value={values.email} name="email" />
      <PasswordInput onChange={handleChange} value={values.password} name="password" autoComplete="new-password" />
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
    </form>
  );
}
