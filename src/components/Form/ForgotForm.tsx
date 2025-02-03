import React, { useState } from 'react';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ForgotForm() {
  const [email, setEmail] = useState('');

  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  return (
    <form action="" className='mb-20'>
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name={'email'}
        isIcon={false}
        placeholder={'Укажите e-mail'}
      />
      <Button htmlType="button" type="primary" size="medium">
        Восстановить
      </Button>
    </form>
  )
}
