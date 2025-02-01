import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { User } from '../types/user';

export type IUserFilter = {
  pag: number;
  name: string;
  email: string;
  role: string;
};

export const getUsers = async (
  parameters: IUserFilter
): Promise<{
  meta: Meta;
  data: User[];
}> => {
  try {
    const response = await makeGet(`/users/all`, parameters);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const changeRol = async ({
  id,
  rol,
}: {
  id: User['id'];
  rol: string;
}) => {
  try {
    const response = await makePost(
      `/users/update/${id}`,
      {
        rolId: rol,
      },
      'PUT'
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
