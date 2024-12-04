import { makeGet, makePost } from '../config/fetch';
import {
  DepartmentFilters,
  TDepartmentForm,
  Department,
} from '../types/department';
import { Meta } from '../types';

export const createDepartment = async (data: TDepartmentForm) => {
  try {
    return await makePost('/departments/create', data);
  } catch (error) {
    throw error;
  }
};

export const getDepartments = async (
  params?: DepartmentFilters,
  auth: boolean = false
): Promise<{
  data: Department[];
  meta: Meta;
}> => {
  try {
    const response = await makeGet('/departments/all', params, auth);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getHomeDepartments = async (
  params: DepartmentFilters,
  auth: boolean = false
): Promise<Department[]> => {
  try {
    const response = await makeGet('/departments/all', params, auth);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDepartment = async (id: string): Promise<Department> => {
  try {
    return await makeGet(`/departments/show/${id}`);
  } catch (error) {
    throw error;
  }
};

export const updateDepartment = async ({
  id,
  data,
}: {
  id: string;
  data: TDepartmentForm;
}) => {
  try {
    return await makePost(`/departments/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};

export const deleteDepartment = async (id: Department['id']) => {
  try {
    return await makePost(`/departments/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};
