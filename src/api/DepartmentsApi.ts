import { makePost } from '../config/fetch';
import { TDepartmentForm } from '../types/department';

export const createDepartment = async (data: TDepartmentForm) => {
  try {
    return await makePost('/departments/create', data);
  } catch (error) {
    throw error;
  }
};
