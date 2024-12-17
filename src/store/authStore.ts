import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { TUser } from '../types/user';
import { setCookie } from 'cookies-next';

interface AuthState {
  user: TUser | undefined | null;
  token: string | undefined | null;
  setUser: (user: TUser, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist<AuthState>(
    (set) => ({
      user: undefined,
      token: undefined,
      setUser: async (user, token) => {
        setCookie('token', token, { path: '/', maxAge: 60 * 60 * 24 * 30 });
        set({ user, token });
      },
      logout: async () => {
        set({ user: undefined, token: undefined });
        setCookie('token', '', { path: '/', maxAge: 60 * 60 * 24 * 30 });
      },
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
    } as PersistOptions<AuthState>
  )
);
