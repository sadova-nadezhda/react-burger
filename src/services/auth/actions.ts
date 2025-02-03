import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, setUser, logout } from './slice';
import { AppDispatch } from '../store';
import { BASE_URL } from '../../utils/constants';
import { UserData } from '../../types/UserTypes';


type ApiResponse = {
  success: boolean;
  message?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: UserData; 
};

const apiRequest = async (url: string, method: string, body?: object, dispatch?: AppDispatch): Promise<ApiResponse> => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data: ApiResponse = await response.json();

    if (response.status === 401 && dispatch) {
      await dispatch(refreshToken());
      return apiRequest(url, method, body, dispatch);
    }

    return data;
  } catch (error) {
    console.error('Ошибка запроса:', error);
    throw new Error('Запрос API не удался');
  }
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password, name }: { email: string, password: string, name: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/register`, 'POST', { email, password, name });

      if (data.success) {
        dispatch(setUser({
          user: { email, name },
          accessToken: data.accessToken!,
          refreshToken: data.refreshToken!,
        }));
        console.log('Пользователь успешно зарегистрирован');
      } else {
        throw new Error(data.message || 'Регистрация не удалась');
      }
    } catch (error) {
      dispatch(setError(error.message || 'Ошибка при регистрации'));
      console.error('Ошибка регистрации:', error);
      throw error; 
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string, password: string }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/login`, 'POST', { email, password });

      if (data.success) {
        dispatch(setUser({
          user: { email, name: data.user?.name! },
          accessToken: data.accessToken!.replace('Bearer ', ''),
          refreshToken: data.refreshToken!,
        }));
        
        window.location.href = '/profile'; 
      } else {
        throw new Error(data.message || 'Ошибка входа');
      }
    } catch (error) {
      dispatch(setError(error.message || 'Ошибка при входе в систему'));
      console.error('Ошибка входа:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/logout`, 'POST');

      if (data.success) {
        dispatch(logout());
        console.log('Пользователь успешно вышел из системы');
      } else {
        throw new Error(data.message || 'Выход не удался');
      }
    } catch (error) {
      dispatch(setError(error.message || 'Ошибка при выходе из системы'));
      console.error('Ошибка выхода из системы:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { dispatch }) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      dispatch(setError('Токен обновления не найден'));
      throw new Error('Токен обновления не найден');
    }

    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/token`, 'POST', { token: refreshToken });

      if (data.success) {
        dispatch(setUser({
          user: { email: data.user?.email!, name: data.user?.name! },
          accessToken: data.accessToken!.replace('Bearer ', ''),
          refreshToken: data.refreshToken!,
        }));
      } else {
        dispatch(setError(data.message || 'Не удалось обновить токен'));
        throw new Error(data.message || 'Не удалось обновить токен');
      }
    } catch (error) {
      dispatch(setError(error.message || 'Ошибка при обновлении токена'));
      console.error('Token refresh error:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email, navigate }: { email: string, navigate: (path: string) => void }, { dispatch }) => {
    if (!email.trim()) {
      dispatch(setError('Введите e-mail'));
      throw new Error('Введите e-mail');
    }

    try {
      dispatch(setLoading(true));

      const response = await fetch(`${BASE_URL}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/reset-password');
      } else {
        dispatch(setError(data.message || 'Ошибка восстановления пароля'));
        throw new Error(data.message || 'Ошибка восстановления пароля');
      }
    } catch (error) {
      dispatch(setError('Ошибка сети, попробуйте позже'));
      console.error('Error in forgotPassword:', error);
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ password, token } : { password: string, token: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Ошибка сброса пароля');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка запроса');
    }
  }
);