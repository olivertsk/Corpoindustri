import { makeGet, makePost } from '@/src/config/fetch';
import { TSurvey, TSurveyFilter, TSurveyForm } from '../types/survey';
import { Meta } from '../types';

export const fxAllSurvey = async (parameters?: TSurveyFilter) => {
  try {
    const response = await makeGet(`/surveys/all`, parameters);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSurveys = async (
  parameters: TSurveyFilter
): Promise<{
  meta: Meta;
  data: TSurvey[];
}> => {
  try {
    const response = await makeGet(`/surveys/all`, parameters);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSurvey = async (id: string): Promise<TSurvey> => {
  try {
    return await makeGet(`/surveys/show/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createSurvey = async (data: TSurveyForm) => {
  try {
    return await makePost('/surveys/create', data);
  } catch (error) {
    throw error;
  }
};

export const deleteSurvey = async (id: TSurvey['id']) => {
  try {
    return await makePost(`/surveys/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};

export const updateSurvey = async ({
  id,
  data,
}: {
  id: string;
  data: TSurveyForm;
}) => {
  try {
    return await makePost(`/surveys/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};
