import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { ICategory } from '../types/category';
import { Department } from '../types/department';
import {
  IProductCommentAttributes,
  IProductCommentDetail,
  IProductReviewAttributes,
  IProductReviewDetail,
  IProductSuggestion,
  Product,
  ProductDetail,
  TProductForm,
} from '../types/product';

export type ProductFilters = {
  pag?: number;
  limit?: number;
  search?: string | null;
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

export type ProductReviewFilters = {
  pag?: number;
  limit?: number;
  productId?: string;
  sort?: string;
  isClient?: boolean;
};

export type ProductCommentFilters = {
  pag?: number;
  productId?: string;
  limit?: number;
  sort?: 'desc' | 'asc';
  isClient?: boolean;
};

export const getProducts = async (
  params?: ProductFilters,
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

export const getClientProducts = async (
  params?: ProductFilters,
): Promise<{
  data: Product[];
  meta: Meta;
}> => {
  try {
    const response = await makeGet('/products/search', params);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductSuggestions = async (
  search: string,
): Promise<IProductSuggestion[]> => {
  try {
    return await makeGet('/products/suggestions', { search });
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
  isClient: boolean = false,
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

export const getProductReviews = async (
  params?: ProductReviewFilters,
): Promise<IProductReviewDetail> => {
  try {
    return await makeGet('/product-reviews/all', params);
  } catch (error) {
    throw error;
  }
};

export const createProductReview = async (
  data: Pick<IProductReviewAttributes, 'productId' | 'rating' | 'comment'>,
) => {
  try {
    return await makePost('/product-reviews/create', data);
  } catch (error) {
    throw error;
  }
};

export const approveProductReview = async (id: string) => {
  try {
    return await makePost(
      `/product-reviews/approve/${id}`,
      {
        isApproved: true,
      },
      'PUT',
    );
  } catch (error) {
    throw error;
  }
};

export const getProductComments = async (
  params?: ProductCommentFilters,
): Promise<IProductCommentDetail> => {
  try {
    return await makeGet('/product-comments/all', params);
  } catch (error) {
    throw error;
  }
};

export const createProductComment = async (
  data: Pick<IProductCommentAttributes, 'productId' | 'parentId' | 'content'>,
) => {
  try {
    return await makePost('/product-comments/create', data);
  } catch (error) {
    throw error;
  }
};

export const deleteProductComment = async (id: string) => {
  try {
    return await makePost(`/product-comments/delete/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};
