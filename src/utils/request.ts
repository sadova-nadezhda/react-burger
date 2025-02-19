import { BASE_URL } from './constants';
import { checkResponse } from './checkResponse';

export function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers, // Позволяет переопределить заголовки
    },
    ...options,
  };

  return fetch(url, defaultOptions).then(checkResponse<T>);
}