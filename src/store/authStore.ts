import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { TUser } from '../types/user';

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
      setUser: (user, token) => set({ user, token }),
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
