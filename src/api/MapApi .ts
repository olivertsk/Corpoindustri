import { makeGet, makePost } from '../config/fetch';
import { TMapFilter, TMap, TMapCreate } from '../types/map';
import { Meta } from '../types';

export const getMaps = async (
  params: TMapFilter
): Promise<{
  data: TMap[];
  meta: Meta;
}> => {
  try {
    const response = await makeGet('/maps/all', params);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMap = async (id: string): Promise<TMap> => {
  try {
    return await makeGet(`/maps/show/${id}`);
  } catch (error) {
    throw error;
  }
};

export const deleteMap = async (id: TMap['id']) => {
  try {
    return await makePost(`/maps/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const createMap = async (data: TMapCreate) => {
  try {
    return await makePost('/maps/create', data);
  } catch (error) {
    throw error;
  }
};

export const updateMap = async ({
  data,
  id,
}: {
  data: TMapCreate;
  id: TMap['id'];
}) => {
  try {
    return await makePost(`/maps/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};
