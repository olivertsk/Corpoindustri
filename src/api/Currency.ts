import { makeGet } from '../config/fetch';

export const getAllCurrencies = async () => {
  try {
    const response = await makeGet('/currencies/all');
    return response;
  } catch (error) {
    throw error;
  }
};
