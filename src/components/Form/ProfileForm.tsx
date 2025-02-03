import React from 'react';
import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ProfileForm() {
  return (
    <form >
      <Input
        value='Марк'
        placeholder="Имя"
        name={'name'}
        icon="EditIcon"
      />
      <EmailInput
        value='mail@stellar.burgers'
        name={'email'}
        placeholder="Логин"
        isIcon={true}
      />
      <PasswordInput
        value='password'
        name={'password'}
        icon="EditIcon"
      />
      
    </form>
  )
}
