import { all, show } from '@/src/config/fetch';
import { ICategoryFilter } from '../types/category';

export const fxAllCategories = async (
  parameters: ICategoryFilter
) => {
  try {
    console.log('parameters :>> ', parameters);
    const response = await all('/categories/all', parameters, false);
    console.log('response fxAllCategories :>> ', response);
    return response.data
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
