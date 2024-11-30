import { makeGet, makePost } from '../config/fetch';
import { TMapFilter, TMap } from '../types/map';
import { Meta } from '../types';

export const getMaps = async (
  params: TMapFilter,
  auth: boolean = false
): Promise<{
  data: TMap[];
  meta: Meta;
}> => {
  try {
    const response = await makeGet('/maps/all', params, auth);
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
