import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { Product, TProductForm } from '../types/product';

export type ProductFilters = {
  pag: number;
  name: string;
};

export const getProducts = async (
  params?: ProductFilters,
  auth: boolean = false
): Promise<{
  data: Product[];
  meta: Meta;
}> => {
  try {
    const response = await makeGet('/products/all', params, auth);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createProduct = async (data: TProductForm) => {
  try {
    return await makePost('/products/create', data);
  } catch (error) {
    throw error;
  }
};
