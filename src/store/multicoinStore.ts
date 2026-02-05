import { create } from 'zustand';

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

export const useMultiCoinStore = create<MultiCoinStore>()((set) => ({
  coins: [
    { label: 'Bolívares', value: 'BS', color: '#eab308' },
    { label: 'Dólares', value: 'USD', color: '#218445' },
  ],
  selectedCoin: { label: 'Bolívares', value: 'BS', color: '#eab308' },
  setSelectedCoin: (coin) => set({ selectedCoin: coin }),
}));
