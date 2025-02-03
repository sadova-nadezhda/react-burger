import React, { useState } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function RecoveryForm() {
  const [value, setValue] = useState('');
  const [pass, setPass] = useState('');

  const onPassChange = e => {
    setPass(e.target.value)
  }

  return (
    <form action="" className='mb-20'>
      <PasswordInput
        onChange={onPassChange}
        value={pass}
        name={'password'}
        extraClass="mb-2"
        placeholder={'Введите новый пароль'}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        onChange={e => setValue(e.target.value)}
        value={value}
        name={'code'}
        error={false}
        errorText={'Ошибка'}
        size={'default'}
        extraClass="ml-1"
      />
      <Button htmlType="button" type="primary" size="medium">
        Сохранить
      </Button>
    </form>
  )
}
