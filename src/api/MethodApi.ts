import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import {
  ETypePaymentMethods,
  PaymentMethod,
  PaymentMethodForm,
} from '../types/method';

export type PaymentMethodQuery = {
  pag?: number;
  name?: string;
  type: ETypePaymentMethods;
};

export const getMethods = async (
  params?: PaymentMethodQuery
): Promise<{
  data: PaymentMethod[];
  meta: Meta;
}> => {
  try {
    return await makeGet('/paymentMethods/all', params);
  } catch (error) {
    throw error;
  }
};

export const createMethod = async (data: PaymentMethodForm) => {
  try {
    return await makePost('/paymentMethods/create', data);
  } catch (error) {
    throw error;
  }
};

export const updateMethod = async ({
  data,
  id,
}: {
  id: PaymentMethod['id'];
  data: PaymentMethodForm;
}) => {
  try {
    return await makePost(`/paymentMethods/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};

export const deleteMethod = async (id: PaymentMethod['id']) => {
  try {
    return await makePost(
      `/paymentMethods/deleted/${id}`,
      {
        id,
      },
      'DELETE'
    );
  } catch (error) {
    throw error;
  }
};

export const getMethod = async (id: PaymentMethod['id']) => {
  try {
    return await makeGet(`/paymentMethods/show/${id}`);
  } catch (error) {
    throw error;
  }
};
