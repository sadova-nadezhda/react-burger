import React, { useState } from 'react';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  const onPassChange = e => {
    setPass(e.target.value)
  }
  
  return (
    <form action="" className='mb-20'>
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name={'email'}
        isIcon={false}
      />
      <PasswordInput
        onChange={onPassChange}
        value={pass}
        name={'password'}
        extraClass="mb-2"
      />
      <Button htmlType="button" type="primary" size="medium">
        Войти
      </Button>
    </form>
  )
}
