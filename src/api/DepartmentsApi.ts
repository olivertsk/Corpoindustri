import { makeGet, makePost } from '../config/fetch';
import { TDepartmenFilter, TDepartmentForm } from '../types/department';

export const createDepartment = async (data: TDepartmentForm) => {
  try {
    return await makePost('/departments/create', data);
  } catch (error) {
    throw error;
  }
};

export const fxAllDepartament = async (parameters: TDepartmenFilter) => {
  try {
    const response = await makeGet(
      `/departments/all`,
      parameters as Record<string, string>,
      false
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
