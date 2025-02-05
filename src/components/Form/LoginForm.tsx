import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { loginUser } from '../../services/auth/actions'; 

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(email, password, navigate));
  };

  return (
    <form onSubmit={onSubmit} className="mb-20">
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name="email"
        isIcon={false}
        autoComplete="email"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={password}
        name="password"
        autoComplete="password"
      />
      {error && <p className="error-message">{error}</p>} 
      <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  );
}
