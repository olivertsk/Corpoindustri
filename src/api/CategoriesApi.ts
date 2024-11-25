import { makePost } from '@/src/config/fetch';
import { UserFormLogin } from '../types/user';
import { ICategory, ICategoryFilter } from '../types/category';

export const fxAllCategories = async (
  parameters: ICategoryFilter
): Promise<ICategory> => {
  try {
    return await makePost('/category/all', parameters);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const category = async (body: UserFormLogin) => {
  try {
    return await makePost('/category/login', body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
