import { makeGet, show } from '@/src/config/fetch';
import { ICategoryFilter } from '../types/category';

export const fxAllCategories = async (parameters: ICategoryFilter) => {
  try {
    const response = await makeGet(
      `/categories/all`,
      parameters as Record<string, string>,
      false
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const category = async (id: string) => {
  try {
    return await show('/categories/show', id, false);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
