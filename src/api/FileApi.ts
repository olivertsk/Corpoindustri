import { uploadFileRequest } from '@/src/config/fetch';

export const uploadFile = async (file: File) => {
  try {
    if (file.name && file.size) {
      const formData = new FormData();
      formData.append('file', file);
      return await uploadFileRequest('/files/uploadFile', formData);
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new Error(String(error));
  }
};
