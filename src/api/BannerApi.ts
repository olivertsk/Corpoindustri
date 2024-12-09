import { makeGet, makePost } from '@/src/config/fetch';
import { IBanner, IBannerCreate, IBannerFilter } from '../types/banner';
import { Meta } from '../types';

export const fxAllBanner = async (parameters: IBannerFilter) => {
  try {
    const response = await makeGet(
      `/banners/all`,
      parameters as Record<string, string>
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBanners = async (
  parameters: IBannerFilter
): Promise<{
  meta: Meta;
  data: IBanner[];
}> => {
  try {
    const response = await makeGet(
      `/banners/all`,
      parameters as Record<string, string>
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getBannerById = async (id: IBanner['id']) => {
  try {
    return await makeGet(`/banners/show/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBanner = async (id: IBanner['id']) => {
  try {
    return await makePost(`/banners/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const createBanner = async (data: IBannerCreate) => {
  try {
    return await makePost('/banners/create', data);
  } catch (error) {
    console.log('error :>> ', error);
    throw error;
  }
};

export const updateBanner = async ({
  data,
  id,
}: {
  data: IBannerCreate;
  id: IBanner['id'];
}) => {
  try {
    return await makePost(`/banners/update/${id}`, data, 'PUT');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
