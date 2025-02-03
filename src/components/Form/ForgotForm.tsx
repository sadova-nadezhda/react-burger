import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ForgotForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        navigate('/reset-password');
      } else {
        setError(data.message);
      }
    })
    .catch((error) => {
      setError('Ошибка сети, попробуйте позже');
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className='mb-20'>
      <EmailInput
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        name={'email'}
        isIcon={false}
        placeholder={'Укажите e-mail'}
        autoComplete="email"
      />
      {error && <div className="error-message">{error}</div>}
      <Button htmlType="submit" type="primary" size="medium" disabled={loading}>
        {loading ? 'Загрузка...' : 'Восстановить'}
      </Button>
    </form>
  );
}
