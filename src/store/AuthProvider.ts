import { useContext, createContext, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { loginUser, logoutUser, getUserData, updateUserData, refreshToken } from '../services/auth/actions';
import { UserData } from '../types/UserTypes';

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  getUser: () => void;
  signIn: (form: { email: string; password: string }) => Promise<void>;
  signOut: (cb: () => void) => void;
  refreshUser: () => void;
  updateUser: (name: string, email: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface ProvideAuthProps {
  children: ReactNode;
}

export function ProvideAuth({ children }: ProvideAuthProps) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth необходимо использовать внутри ProvideAuth');
  }
  return context;
}

export function useProvideAuth() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  const getUser = async () => {
    dispatch(getUserData());
  };

  const signIn = async (form: { email: string; password: string }) => {
    const { email, password } = form;
    await dispatch(loginUser({ email, password }))
      .then((data) => {
        if (data.payload?.success) {
          const { accessToken, refreshToken } = data.payload;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
      })
      .catch((error) => {
        console.error('Ошибка входа:', error);
      });
  };

  const signOut = (cb: () => void) => {
    dispatch(logoutUser())
      .then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        cb();
      })
      .catch((error) => {
        console.error('Ошибка выхода:', error);
      });
  };

  const refreshUser = () => {
    dispatch(refreshToken())
      .catch((error) => {
        console.error('Ошибка обновления токена:', error);
      });
  };

  const updateUser = (name: string, email: string, password: string) => {
    dispatch(updateUserData(name, email, password))
      .then(() => {
        console.log('Данные пользователя обновлены');
      })
      .catch((error) => {
        console.error('Ошибка обновления данных:', error);
      });
  };

  return {
    user,
    loading,
    error,
    getUser,
    signIn,
    signOut,
    refreshUser,
    updateUser,
  };
}
