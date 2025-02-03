import React, { useState, useEffect } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { RootState } from '../../services/store';
import { updateUserData, getUserData } from '../../services/auth/actions';

export default function ProfileForm() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, dispatch]); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserData(name, email, password));
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <div>Пользователь не найден. Пожалуйста, войдите в систему.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
        name="name"
        icon="EditIcon"
      />
      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        icon="EditIcon"
      />
      <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
        Сохранить
      </Button>
    </form>
  );
}
