import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { Department } from '../types/department';
import { Product, TProductForm } from '../types/product';

export type ProductFilters = {
  pag?: number;
  limit?: number;
  name?: string | null;
  departmentId?: string | null;
  departmentIds?: Department['id'][] | null;
  categoryId?: string | null;
  categoryIds?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  order?: 'maxPrice' | 'minPrice';
  typeSearch?: string | null;
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

export const deleteProduct = async (id: Product['id']) => {
  try {
    return await makePost(`/products/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (
  id: string,
  reqLocal: boolean = false
): Promise<Product> => {
  try {
    return await makeGet(`/products/show/${id}`, undefined, reqLocal);
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: TProductForm;
}) => {
  try {
    return await makePost(`/products/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};
