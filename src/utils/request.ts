import { BASE_URL } from './constants';
import { checkResponse } from './checkResponse';

export function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkResponse);
}