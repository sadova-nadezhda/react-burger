import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoading, setError, setUser, logout, setAuthChecked, setSuccess } from './slice';
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

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  };
};

const apiRequest = async (
  url: string,
  method: string,
  body?: object,
  dispatch?: AppDispatch,
  retryCount = 0
): Promise<ApiResponse> => {
  if (retryCount > 1) throw new Error('Ошибка авторизации: повторные попытки не удались');

  try {
    const response = await fetch(url, {
      method,
      headers: getAuthHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });

    const data: ApiResponse = await response.json();

    if (response.status === 401 && dispatch) {
      await dispatch(refreshToken());
      return apiRequest(url, method, body, dispatch, retryCount + 1);
    }

    return data;
  } catch (error) {
    console.error('Ошибка API:', error);
    throw new Error('Ошибка сети, попробуйте позже');
  }
};

const handleAuthResponse = (data: ApiResponse, dispatch: AppDispatch) => {
  if (!data.success) {
    dispatch(setError(data.message || 'Ошибка'));
    return false;
  }

  const accessToken = data.accessToken!.replace('Bearer ', '');
  const refreshToken = data.refreshToken!;
  
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(data.user));

  dispatch(setUser({ user: data.user!, accessToken, refreshToken }));
  return true;
};

export const registerUser = (email: string, password: string, name: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await apiRequest(`${BASE_URL}/auth/register`, 'POST', { email, password, name });
    const success = handleAuthResponse(data, dispatch);

    dispatch(setSuccess(success));

    return data;
  } catch {
    dispatch(setError('Ошибка при регистрации'));
    return { success: false };
  } finally {
    dispatch(setLoading(false));
  }
};

export const loginUser = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await apiRequest(`${BASE_URL}/auth/login`, 'POST', { email, password }, dispatch);
    return handleAuthResponse(data, dispatch);
  } catch {
    dispatch(setError('Ошибка при входе'));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('Токен отсутствует');

    const data = await apiRequest(`${BASE_URL}/auth/logout`, 'POST', { token: refreshToken });
    if (data.success) {
      localStorage.clear();
      dispatch(logout());
    } else {
      dispatch(setError(data.message || 'Выход не удался'));
    }
  } catch {
    dispatch(setError('Ошибка при выходе'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const refreshToken = () => async (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    dispatch(setError('Токен обновления не найден'));
    return dispatch(logout());
  }

  dispatch(setLoading(true));
  try {
    const data = await apiRequest(`${BASE_URL}/auth/token`, 'POST', { token: refreshToken }, dispatch);
    if (handleAuthResponse(data, dispatch)) return;
    dispatch(logout());
  } catch {
    dispatch(setError('Ошибка при обновлении токена'));
    dispatch(logout());
  } finally {
    dispatch(setLoading(false));
  }
};

export const forgotPassword = (email: string) => async (dispatch: AppDispatch) => {
  if (!email.trim()) return dispatch(setError('Введите e-mail'));

  dispatch(setLoading(true));
  try {
    const response = await fetch(`${BASE_URL}/password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    if (data.success) {
      dispatch(setSuccess(true));
    } else {
      dispatch(setError(data.message || 'Ошибка восстановления пароля'));
      dispatch(setSuccess(false));
    }
  } catch {
    dispatch(setError('Ошибка сети, попробуйте позже'));
    dispatch(setSuccess(false));
  } finally {
    dispatch(setLoading(false));
  }
};

export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string },
  { rejectValue: string }
>(
  'auth/resetPassword',
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/password-reset/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message || 'Ошибка сброса пароля');
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Ошибка запроса');
    }
  }
);

export const getUserData = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await apiRequest(`${BASE_URL}/auth/user`, 'GET', undefined, dispatch);
    if (data.success) dispatch(setUser({
      user: data.user!, ...localStorage,
      accessToken: '',
      refreshToken: ''
    }));
    else dispatch(setError(data.message || 'Ошибка получения данных'));
  } catch {
    dispatch(setError('Ошибка получения данных пользователя'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateUserData = (name: string, email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const data = await apiRequest(`${BASE_URL}/auth/user`, 'PATCH', { name, email, password }, dispatch);
    if (data.success) dispatch(setUser({
      user: data.user!, ...localStorage,
      accessToken: '',
      refreshToken: ''
    }));
    else dispatch(setError(data.message || 'Ошибка обновления данных'));
  } catch {
    dispatch(setError('Ошибка обновления данных пользователя'));
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkAuth = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    dispatch(logout());
    dispatch(setAuthChecked(true));
    dispatch(setLoading(false));
    return;
  }

  try {
    if (accessToken) {
      const data = await apiRequest(`${BASE_URL}/auth/user`, 'GET', undefined, dispatch);
      if (data.success) {
        dispatch(setUser({ user: data.user!, accessToken, refreshToken }));
        dispatch(setAuthChecked(true));
        return;
      }
    } 

    const tokenData = await apiRequest(`${BASE_URL}/auth/token`, 'POST', { token: refreshToken }, dispatch);
    if (handleAuthResponse(tokenData, dispatch)) {
      const userData = await apiRequest(`${BASE_URL}/auth/user`, 'GET', undefined, dispatch);
      if (userData.success) {
        dispatch(setUser({ user: userData.user!, accessToken: tokenData.accessToken, refreshToken }));
      }
    } else {
      dispatch(logout());
    }
  } catch (error) {
    dispatch(setError("Ошибка при проверке авторизации"));
    dispatch(logout());
  } finally {
    dispatch(setAuthChecked(true));
    dispatch(setLoading(false));
  }
};