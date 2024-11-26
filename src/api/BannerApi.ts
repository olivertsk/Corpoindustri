import { makeGet } from '@/src/config/fetch';
import { IBannerFilter } from '../types/banner';

export const fxAllBanner = async (parameters: IBannerFilter) => {
  try {
    const response = await makeGet(
      `/banners/all`,
      parameters as Record<string, string>,
      false
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

