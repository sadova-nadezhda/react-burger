import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../services/auth/actions';  
import { useAppDispatch } from '../../hooks/store';

export default function RegisterForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();  

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-20">
      <Input
        type="text"
        placeholder="Имя"
        onChange={onNameChange}
        value={name}
        name="name"
        error={false}
        errorText="Ошибка имя"
        size="default"
        autoComplete="name"
      />
      <EmailInput
        onChange={onEmailChange}
        value={email}
        name="email"
        isIcon={false}
        autoComplete="email"
      />
      <PasswordInput
        onChange={onPasswordChange}
        value={password}
        name="password"
        autoComplete="new-password"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Зарегистрироваться
      </Button>
    </form>
  );
}
