import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function RegisterForm() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
  
    fetch(`https://norma.nomoreparties.space/api/auth/check-email?email=${email}`)
      .then(response => response.json())
      .then((data: { exists: boolean }) => {
        if (data.exists) {
          alert('This email is already registered.');
        } else {
          fetch('https://norma.nomoreparties.space/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
              name,
            }),
          })
          .then((response) => response.json())
          .then((data: { success: boolean; message?: string }) => {
            if (data.success) {
              console.log('User successfully registered');
            } else {
              console.error('Registration failed:', data.message);
            }
          })
          .catch((error) => console.error('Error during registration:', error));
        }
      });
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
