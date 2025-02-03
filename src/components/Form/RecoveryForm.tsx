import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function RecoveryForm() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        navigate('/login');
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error('Error:', error));
  };

  return (
    <form onSubmit={handleSubmit} className='mb-20'>
      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        name={'password'}
        extraClass="mb-2"
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
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
        autoComplete="token"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Сохранить
      </Button>
    </form>
  );
}
