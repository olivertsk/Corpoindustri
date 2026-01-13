import { GridRowsProp } from '@mui/x-data-grid';
import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import {
  AllRolResponse,
  IRolFilter,
  IRolPayloadForm,
  TRol,
} from '../types/rol';

export type AllRolTable = {
  items: GridRowsProp;
  meta: Meta;
};

export const getAllRols = async (
  params: IRolFilter
): Promise<AllRolResponse | undefined> => {
  try {
    const { data } = await makeGet('/rols/all', {
      params,
    });

    const result = data.data;
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const getAllRolsForTable = async (
  params: IRolFilter
): Promise<AllRolTable | undefined> => {
  try {
    const { data } = await makeGet('/rols/all', {
      params,
    });

    const result = data.data;
    const rows: GridRowsProp = result.data.map((item: TRol) => ({
      id: item.id,
      name: item.name,
      permissions: item.permissions?.length || 0,
    }));

    return {
      items: rows,
      meta: result.meta,
    };
  } catch (error) {
    throw error;
  }
};

export const createRol = async (formData: IRolPayloadForm) => {
  try {
    const { data } = await makePost('/rols/create', formData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateRol = async ({
  formData,
  id,
}: {
  formData: IRolPayloadForm;
  id: TRol['id'];
}) => {
  console.log('formData :>> ', formData);
  console.log('id :>> ', id);
  try {
    const { data } = await makePost(`/rols/${id}`, formData, 'PUT');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getRolById = async (id: TRol['id']): Promise<TRol | undefined> => {
  try {
    const { data } = await makeGet(`/rols/show/${id}`);
    delete data.created_at;
    delete data.updated_at;

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRol = async (id: TRol['id']) => {
  try {
    const { data } = await makePost(`/rols/deleted/${id}`, {}, 'DELETE');
    return data;
  } catch (error) {
    throw error;
  }
};
