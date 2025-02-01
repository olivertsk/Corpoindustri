import { makeGet } from '../config/fetch';

export const getRols = async (): Promise<{
  data: { name: string; id: string }[];
}> => {
  try {
    const response = await makeGet(`/rols/all`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
