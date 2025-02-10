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

const apiRequest = async (url: string, method: string, body?: object, dispatch?: AppDispatch, retryCount = 0): Promise<ApiResponse> => {
  if (retryCount > 1) {
    throw new Error('Ошибка авторизации: повторные попытки не удались');
  }

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
      return apiRequest(url, method, body, dispatch, retryCount + 1);
    }

    return data;
  } catch (error) {
    console.error('Ошибка запроса:', error);
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
        return Promise.resolve(true);
      } else {
        dispatch(setError(data.message || 'Ошибка входа'));
        return Promise.reject(data.message || 'Ошибка входа');
      }
    } catch (error) {
      dispatch(setError('Ошибка при входе в систему'));
      console.error('Ошибка входа:', error);
      return Promise.reject('Ошибка при входе в систему');
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const refreshToken = localStorage.getItem('refreshToken'); 
      if (!refreshToken) {
        dispatch(setError('Токен отсутствует'));
        return;
      }

      const data = await apiRequest(`${BASE_URL}/auth/logout`, 'POST', { token: refreshToken });

      if (data.success) {
        dispatch(logout());
        console.log('Пользователь успешно вышел');
      } else {
        dispatch(setError(data.message || 'Выход не удался'));
      }
    } catch (error) {
      dispatch(setError('Ошибка при выходе'));
      console.error('Ошибка выхода:', error);
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
      dispatch(logout());
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
        dispatch(setError('Не удалось обновить токен'));
        dispatch(logout());  // Выход из аккаунта при неудаче
      }
    } catch (error) {
      dispatch(setError('Ошибка при обновлении токена'));
      console.error('Token refresh error:', error);
      dispatch(logout());  // Выход из аккаунта при ошибке
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

export const getUserData = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/user`, 'GET', undefined, dispatch);

      if (data.success) {
        dispatch(setUser({
          user: data.user!,
          accessToken: localStorage.getItem('accessToken')!,
          refreshToken: localStorage.getItem('refreshToken')!,
        }));
        console.log('Данные пользователя успешно получены');
      } else {
        dispatch(setError(data.message || 'Ошибка при получении данных пользователя'));
      }
    } catch (error) {
      dispatch(setError('Ошибка при получении данных пользователя'));
      console.error('Ошибка получения данных:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const updateUserData = (name: string, email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const data = await apiRequest(`${BASE_URL}/auth/user`, 'PATCH', { name, email, password }, dispatch);

      if (data.success) {
        dispatch(setUser({
          user: data.user!,
          accessToken: localStorage.getItem('accessToken')!,
          refreshToken: localStorage.getItem('refreshToken')!,
        }));
        console.log('Данные пользователя успешно обновлены');
      } else {
        dispatch(setError(data.message || 'Ошибка при обновлении данных пользователя'));
      }
    } catch (error) {
      dispatch(setError('Ошибка при обновлении данных пользователя'));
      console.error('Ошибка обновления данных:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};