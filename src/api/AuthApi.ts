import { makePost } from '@/src/config/fetch';
import { UserFormLogin, UserFormRegistration } from '../types/user';

export const registerUser = async (body: UserFormRegistration) => {
  try {
    return await makePost('/auth/register', body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authenticateUser = async (body: UserFormLogin) => {
  try {
    return await makePost('/auth/login', body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
