import { makePost, uploadFileRequest } from '@/src/config/fetch';

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

export const deleteFile = async (fileName: string) => {
  if (
    typeof window !== 'undefined' &&
    window.confirm('¿Estás seguro de que quieres eliminar esta imagen?')
  ) {
    try {
      await makePost(
        '/files/delete',
        { type: location.pathname.split('/')[2], fileName },
        'DELETE'
      );

      return true;
    } catch (error) {
      console.error(error);
      throw new Error(String(error));
    }
  } else {
    return false;
  }
};
