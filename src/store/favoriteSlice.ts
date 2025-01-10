import { StateCreator } from 'zustand';
import { getFavoriteProducts } from '../api/FavoriteApi';
import { Favorite } from '../types/favorite';

export type FavoriteSlice = {
  favorite: Favorite[];
  page: number;
  totalPages: number;
  getFavorites: () => void;
  setPage: (page: number) => void;
};

export const createFavoriteSlice: StateCreator<
  FavoriteSlice,
  [],
  [],
  FavoriteSlice
> = (set, get) => ({
  favorite: [],
  page: 1,
  totalPages: 1,
  getFavorites: async () => {
    const products = await getFavoriteProducts({
      pag: get().page,
      isClient: true,
    });
    set({
      favorite: products?.data || [],
      totalPages: products?.meta?.totalPage || 1,
    });
  },
  setPage: (page: number) => {
    set({ page });
    get().getFavorites();
  },
});
