import React, { useState } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  return (
    <form action="" className='mb-20'>
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name={'email'}
        isIcon={false}
        autoComplete="email"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={password}
        name={'password'}
        extraClass="mb-2"
        autoComplete="password"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
    </form>
  )
}
