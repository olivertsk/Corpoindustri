import { makeGet, makePost } from '@/src/config/fetch';
import { Meta } from '../types';
import { TPost, TPostFilters, TPostForm } from '../types/post';

export const getPosts = async (
  parameters?: TPostFilters,
): Promise<{ data: TPost[]; meta: Meta }> => {
  try {
    return await makeGet('/posts/all', parameters);
  } catch (error) {
    throw error;
  }
};

export const getPost = async (id: string): Promise<TPost> => {
  try {
    return await makeGet(`/posts/show/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createPost = async (data: TPostForm) => {
  try {
    return await makePost('/posts/create', data);
  } catch (error) {
    throw error;
  }
};

export const updatePost = async ({
  id,
  data,
}: {
  id: string;
  data: TPostForm;
}) => {
  try {
    return await makePost(`/posts/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: TPost['id']) => {
  try {
    return await makePost(`/posts/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};
