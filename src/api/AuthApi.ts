import { makePost } from '@/src/config/fetch';
import {
  ForgotPasswordForm,
  TUpdateUser,
  TUser,
  UserFormChangePassword,
  UserFormLogin,
  UserFormRegistration,
  UserRecoveryPassword,
} from '../types/user';

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

export const updateUser = async ({
  body,
  userId,
}: {
  body: TUpdateUser;
  userId: TUser['id'];
}) => {
  try {
    return await makePost(`/auth/update/${userId}`, body, 'PUT');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateUserPassword = async (body: UserFormChangePassword) => {
  try {
    return await makePost(`/auth/password`, body, 'PATCH');
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const forgotPassword = async ({ email }: ForgotPasswordForm) => {
  try {
    return await makePost(`/auth/passwordReset `, { email });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const resetPassword = async (body: UserRecoveryPassword) => {
  try {
    return await makePost(`/auth/passwordRecovery`, body);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePushToken = async (body: { tokenPush: string }) => {
  try {
    return await makePost(`/auth/updateTokenPush`, body, 'PATCH');
  } catch (error) {
    console.error(error);
    throw error;
  }
};
