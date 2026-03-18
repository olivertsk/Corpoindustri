import { create } from 'zustand';
import { getAllCurrencies } from '../api/Currency';

type MultiCoinStore = {
  coins: Coin[];
  selectedCoin: Coin;
  currencies: Currency[];
  isLoadingCurrencies: boolean;
  setSelectedCoin: (coin: Coin) => void;
  getCurrency: () => void;
};

export type Coin = {
  label: string;
  value: 'USD' | 'BS';
  color: string;
};

export type Currency = {
  exchangeRate: number;
  name: string;
  symbol: string;
  code: 'USD';
};

export const useMultiCoinStore = create<MultiCoinStore>()((set) => ({
  currencies: [],
  coins: [
    { label: 'Bolívares', value: 'BS', color: '#eab308' },
    { label: 'Dólares', value: 'USD', color: '#218445' },
  ],
  selectedCoin: { label: 'Bolívares', value: 'BS', color: '#eab308' },
  isLoadingCurrencies: true,
  setSelectedCoin: (coin) => set({ selectedCoin: coin }),
  getCurrency: async () => {
    const res = await getAllCurrencies();
    set({ currencies: res.data, isLoadingCurrencies: false });
  },
}));
