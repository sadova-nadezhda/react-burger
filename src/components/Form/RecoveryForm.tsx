import React, { useState, FormEvent } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { resetPassword } from '../../services/auth/actions';


export default function RecoveryForm() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name="password"
        placeholder="Введите новый пароль"
        autoComplete="new-password"
      />
      <Input
        type="text"
        placeholder="Введите код из письма"
        onChange={(e) => setToken(e.target.value)}
        value={token}
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
