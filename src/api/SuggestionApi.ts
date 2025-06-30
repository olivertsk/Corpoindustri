import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { Suggestion } from '../types/suggestion';

export type SuggestionParams = {
  pag: number;
};

export const createSuggestion = async ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  try {
    await makePost('/suggestions/create', { title, description });
    return { success: true, message: 'Mensaje enviado correctamente.' };
  } catch {
    return { success: false, message: 'Error al enviar el contacto.' };
  }
};

type AllSuggestions = {
  meta: Meta;
  data: Suggestion[];
};

export const getSuggestions = async (
  params: SuggestionParams
): Promise<AllSuggestions> => {
  try {
    const response = await makeGet('/suggestions/all', params);
    return response;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};

export const getSuggestionById = async (id: string): Promise<Suggestion> => {
  try {
    const response = await makeGet(`/suggestions/show/${id}`);
    return response;
  } catch (error) {
    console.error('Error fetching suggestion by ID:', error);
    throw error;
  }
};
