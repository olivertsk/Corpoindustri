import { makeGet } from '@/src/config/fetch';
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

