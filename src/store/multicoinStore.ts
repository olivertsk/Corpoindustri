import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MultiCoinStore = {
  coins: Coin[];
  selectedCoin: Coin;
  setSelectedCoin: (coin: Coin) => void;
};

export type Coin = {
  label: string;
  value: 'USD' | 'BS';
  color: string;
};

import type { PersistOptions } from 'zustand/middleware';

export const useMultiCoinStore = create<MultiCoinStore>()(
  persist<MultiCoinStore>(
    (set) => ({
      coins: [
        { label: 'Bolívares', value: 'BS', color: '#eab308' },
        { label: 'Dólares', value: 'USD', color: '#218445' },
      ],
      selectedCoin: { label: 'Bolívares', value: 'BS', color: '#eab308' },
      setSelectedCoin: (coin) => set({ selectedCoin: coin }),
    }),
    {
      name: 'counter-storage', // Unique name for local storage
    } as PersistOptions<MultiCoinStore>
  )
);
