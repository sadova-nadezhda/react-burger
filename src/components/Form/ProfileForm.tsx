import React, { useState, useEffect } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { RootState } from '../../services/store';
import { updateUserData, getUserData } from '../../services/auth/actions';

export default function ProfileForm() {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const loading = useAppSelector((state: RootState) => state.auth.loading);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setIsChanged(true);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserData(name, email, password));
    setIsChanged(false);
    setPassword('');
  };

  const handleCancel = () => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    setPassword('');
    setIsChanged(false);
  };

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пользователь не найден. Пожалуйста, войдите в систему.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <Input
        value={name}
        onChange={handleChange(setName)}
        placeholder="Имя"
        name="name"
        icon="EditIcon"
      />
      <EmailInput
        value={email}
        onChange={handleChange(setEmail)}
        name="email"
        placeholder="E-mail"
        isIcon={true}
      />
      <PasswordInput
        value={password}
        onChange={handleChange(setPassword)}
        name="password"
        icon="EditIcon"
      />
      {isChanged && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button htmlType="button" type="secondary" size="medium" onClick={handleCancel}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}