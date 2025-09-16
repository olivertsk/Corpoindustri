import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { ICategory } from '../types/category';
import { Department } from '../types/department';
import { Product, ProductDetail, TProductForm } from '../types/product';

export type ProductFilters = {
  pag?: number;
  limit?: number;
  name?: string | null;
  departmentId?: string | null;
  departmentIds?: Department['id'][] | null;
  categoriesIds?: ICategory['id'][] | null;
  categoryId?: string | null;
  minPrice?: string | null;
  maxPrice?: string | null;
  order?: 'maxPrice' | 'minPrice';
  typePrice?: 'price' | 'priceBs';
  typeSearch?: string | null;
  isClient?: boolean;
};

export const getProducts = async (
  params?: ProductFilters
): Promise<{
  data: Product[];
  meta: Meta;
}> => {
  try {
    const response = await makeGet('/products/all', params);
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
  isClient: boolean = false
): Promise<ProductDetail> => {
  try {
    return await makeGet(`/products/show/${id}`, {
      isClient,
    });
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
