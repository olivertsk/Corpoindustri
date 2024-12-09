import { makeGet, makePost } from '@/src/config/fetch';
import { ICategory, ICategoryFilter, TCategoryForm } from '../types/category';
import { Meta } from '../types';

export const fxAllCategories = async (parameters: ICategoryFilter) => {
  try {
    const response = await makeGet(
      `/categories/all`,
      parameters as Record<string, string>
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategories = async (
  parameters: ICategoryFilter
): Promise<{
  meta: Meta;
  data: ICategory[];
}> => {
  try {
    const response = await makeGet(
      `/categories/all`,
      parameters as Record<string, string>
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCategory = async (id: string): Promise<ICategory> => {
  try {
    return await makeGet(`/categories/show/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (data: TCategoryForm) => {
  try {
    return await makePost('/categories/create', data);
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (id: ICategory['id']) => {
  try {
    return await makePost(`/categories/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: TCategoryForm;
}) => {
  try {
    return await makePost(`/categories/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};
