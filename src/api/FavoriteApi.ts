import { makePost, makeGet } from '../config/fetch';
import { Product } from '../types/product';

type FavoriteProductFilters = {
  pag: number;
  isClient: boolean;
};

export const addProductToFavorites = async (productId: Product['id']) => {
  try {
    return await makePost(`/favoriteProducts/create`, {
      productId,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeProductToFavorites = async (productId: Product['id']) => {
  try {
    return await makePost(
      `/favoriteProducts/deleted/${productId}`,
      {},
      'DELETE'
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavoriteProducts = async (params: FavoriteProductFilters) => {
  try {
    return await makeGet(`/favoriteProducts/all`, params);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
