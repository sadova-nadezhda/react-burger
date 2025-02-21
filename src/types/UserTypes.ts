export interface UserData {
  email: string;
  name: string;
  password: string;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  email: string;
  name: string;
  accessToken?: string;
  refreshToken?: string;
}

export type AuthError = 'INVALID_CREDENTIALS' | 'TOKEN_EXPIRED' | 'NETWORK_ERROR' | 'UNKNOWN_ERROR' |string | null;
