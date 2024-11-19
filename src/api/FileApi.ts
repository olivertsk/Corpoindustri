import { uploadFileRequest } from '@/src/config/fetch';

export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    return await uploadFileRequest('/files/uploadFile', formData);
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};
