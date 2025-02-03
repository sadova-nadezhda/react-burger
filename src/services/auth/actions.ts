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
        Authorization: accessToken ? `Предъявитель ${accessToken}` : '',
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
    throw new Error('Запрос API не удался');
  }
};

export const registerUser = (email: string, password: string, name: string) => {
  return async (dispatch: AppDispatch) => {
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
        dispatch(setError(data.message || 'Регистрация не удалась'));
      }
    } catch (error) {
      dispatch(setError('Ошибка при регистрации'));
      console.error('Ошибка регистрации:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const loginUser = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/login`, 'POST', { email, password }, dispatch);

      if (data.success) {
        dispatch(setUser({
          user: { email, name: data.user?.name! },
          accessToken: data.accessToken!.replace('Bearer ', ''),
          refreshToken: data.refreshToken!,
        }));
        
        window.location.href = '/';
      } else {
        dispatch(setError(data.message || 'Ошибка входа'));
      }
    } catch (error) {
      dispatch(setError('Ошибка при входе в систему'));
      console.error('Ошибка входа:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/logout`, 'POST');

      if (data.success) {
        dispatch(logout());
        console.log('Пользователь успешно вышел из системы');
      } else {
        dispatch(setError(data.message || 'Выход не удался'));
      }
    } catch (error) {
      dispatch(setError('Ошибка при выходе из системы'));
      console.error('Ошибка выхода из системы:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const refreshToken = () => {
  return async (dispatch: AppDispatch) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      dispatch(setError('Токен обновления не найден'));
      return;
    }

    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/token`, 'POST', { token: refreshToken }, dispatch);

      if (data.success) {
        dispatch(setUser({
          user: { email: data.user?.email!, name: data.user?.name! },
          accessToken: data.accessToken!.replace('Bearer ', ''),
          refreshToken: data.refreshToken!,
        }));
      } else {
        dispatch(setError(data.message || 'Не удалось обновить токен'));
      }
    } catch (error) {
      dispatch(setError('Ошибка при обновлении токена'));
      console.error('Token refresh error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const forgotPassword = (email: string, navigate: (path: string) => void) => {
  return async (dispatch: AppDispatch) => {
    if (!email.trim()) {
      dispatch(setError('Введите e-mail'));
      return;
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
      }
    } catch (error) {
      dispatch(setError('Ошибка сети, попробуйте позже'));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string },
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/password-reset/reset`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, token }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Ошибка сброса пароля');
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка запроса');
    }
  }
);