import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function RecoveryForm() {
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token })
    })
    .then((response) => response.json())
    .then((data: { success: boolean; message: string }) => {
      if (data.success) {
        navigate('/login');
      } else {
        console.error(data.message);
      }
    })
    .catch((error: Error) => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit} className='mb-20'>
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        placeholder={'Введите новый пароль'}
        autoComplete="password"
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={(e) => setToken(e.target.value)}
        value={token} 
        name={'token'}
        error={false}
        errorText={'Ошибка кода'}
        size={'default'}
        autoComplete="token"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
    </form>
  );
}
