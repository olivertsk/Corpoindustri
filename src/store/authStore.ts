import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { TUser } from '../types/user';
import { setCookie } from 'cookies-next';

interface AuthState {
  user: TUser | null;
  token: string | null;
  setUser: (user: TUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      setUser: async (user, token) => {
        setCookie('token', token, { path: '/', maxAge: 60 * 60 * 24 * 30 });
        set({ user, token });
      },
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    } as PersistOptions<AuthState>
  )
);
