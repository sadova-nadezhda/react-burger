import React, { useState, ChangeEvent } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function LoginForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
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
