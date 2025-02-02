import { uploadFileRequest } from '../config/fetch';

export const masiveImagesApi = async (data: FormData) => {
  try {
    return await uploadFileRequest('/A2/upload', data);
  } catch (error) {
    throw error;
  }
};
