import React, { useState, useEffect } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector, useAppDispatch } from '../../hooks/store';
import { updateUserData, getUserData } from '../../services/auth/actions';
import { FormValues } from '../../types/FormTypes';

export default function ProfileForm() {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [form, setForm] = useState<FormValues>({ name: '', email: '', password: '' });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!user && !loading) {
      dispatch(getUserData());
    }
  }, [dispatch, user, loading]);

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || '', email: user.email || '', password: '' });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setIsChanged(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(updateUserData(form.name, form.email, form.password));
  
    setIsChanged(false);
    setForm((prev) => ({ ...prev, password: '' }));
  };

  const handleCancel = () => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' });
    }
    setIsChanged(false);
  };

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Пользователь не найден. Пожалуйста, войдите в систему.</div>;

  return (
    <form onSubmit={handleSave}>
      <Input
        value={form.name}
        onChange={handleChange}
        placeholder="Имя"
        name="name"
        icon="EditIcon"
      />
      <EmailInput
        value={form.email}
        onChange={handleChange}
        name="email"
        placeholder="E-mail"
        isIcon={true}
      />
      <PasswordInput
        value={form.password}
        onChange={handleChange}
        name="password"
        icon="EditIcon"
      />
      {isChanged && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <Button type="secondary" size="medium" onClick={handleCancel} htmlType="button">
            Отмена
          </Button>
          <Button type="primary" size="medium" disabled={loading} htmlType="submit">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}