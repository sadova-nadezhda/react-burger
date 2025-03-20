import { BASE_URL } from './constants';
import { checkResponse } from './checkResponse';

export function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkResponse<T>);
}
