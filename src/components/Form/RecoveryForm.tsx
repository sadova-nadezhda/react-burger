import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { resetPassword } from '../../services/auth/actions';
import { useForm } from '../../hooks/useForm';


export default function RecoveryForm() {
  const { values, handleChange } = useForm({ password: '', token: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const action = await dispatch(resetPassword(values));

    if (resetPassword.fulfilled.match(action)) {
      navigate('/login', { replace: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <PasswordInput
        onChange={handleChange}
        value={values.password}
        name="password"
        placeholder="Введите новый пароль"
        autoComplete="new-password"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        onChange={handleChange}
        value={values.token}
        name="token"
        error={!!error}
        errorText={error || 'Ошибка кода'}
        size="default"
        autoComplete="one-time-code"
      />
      <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
        {loading ? 'Сохранение...' : 'Сохранить'}
      </Button>
    </form>
  );
}
