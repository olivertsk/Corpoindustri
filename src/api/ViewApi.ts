import { makeGet, makePost } from '../config/fetch';
import {
  IView,
  IViewPayloadForm,
  IViewFilter,
  AllViewResponse,
  AllViewTable,
} from '../types/permissionsTypes';
import { GridRowsProp } from '@mui/x-data-grid';

export const getAllViews = async (
  params: IViewFilter
): Promise<AllViewResponse | undefined> => {
  try {
    const { data } = await makeGet('/views/all', {
      params,
    });

    const result = data.data;
    return result;
  } catch (error) {
    throw error;
  }
};

export const getAllViewsForTable = async (
  params: IViewFilter
): Promise<AllViewTable | undefined> => {
  try {
    const { data } = await makeGet('/views/all', {
      params,
    });

    const result = data.data;
    const rows: GridRowsProp = result.data.map((item: IView) => ({
      id: item.id,
      name: item.name,
      route: item.route,
    }));

    return {
      items: rows,
      meta: result.meta,
    };
  } catch (error) {
    throw error;
  }
};

export const createView = async (formData: IViewPayloadForm) => {
  try {
    const { data } = await makePost('/views/create', formData);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateView = async ({
  formData,
  id,
}: {
  formData: IViewPayloadForm;
  id: IView['id'];
}) => {
  try {
    const { data } = await makePost(`/views/update/${id}`, formData, 'PUT');
    return data;
  } catch (error) {
    throw error;
  }
};

export const getViewById = async (
  id: IView['id']
): Promise<IView | undefined> => {
  try {
    const { data } = await makeGet(`/views/show/${id}`);
    delete data.created_at;
    delete data.updated_at;

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteView = async (id: IView['id']) => {
  try {
    const { data } = await makePost(`/views/deleted/${id}`, {}, 'DELETE');
    return data;
  } catch (error) {
    throw error;
  }
};
