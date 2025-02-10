import React, { FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { loginUser } from '../../services/auth/actions';
import { useForm } from '../../hooks/useForm';

export default function LoginForm() {
  const { values, handleChange } = useForm({ email: '', password: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useAppSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser(values.email, values.password));
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <EmailInput onChange={handleChange} value={values.email} name="email" autoComplete="email" />
      <PasswordInput onChange={handleChange} value={values.password} name="password" autoComplete="password" />
      {error && <p>{error}</p>}
      <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
        {loading ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  );
}
